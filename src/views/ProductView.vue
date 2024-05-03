<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import { mdiAccount } from '@mdi/js';
import { useRouter } from 'vue-router';

const router = useRouter();
const iframeSrc = router.resolve({ name: 'IframeContainer' }).href;

const pre = ref(false)
const rawList = ref([]);
const tagGroupList = ref([]);
const routeList = ref([]);
const productList = ref([]);
const editProduct = ref({
  Route: '',
  Tags: {}
});


const getTagGroupList = async () => {
    // Key: 主題名稱
    // Tag: 標籤ID, 
    // Name: 標籤名稱, 
    // Imgsrc: 圖片url, 
    // TagGroup:主題
  const response = await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_tags?Brand=INFS&Per_Page=100&Page=1');
  const tagGroupMap = {};
  response.data.models.forEach(tag => {
    if (!tagGroupMap[tag.TagGroup]) {
      tagGroupMap[tag.TagGroup] = [];
    }
    tagGroupMap[tag.TagGroup].push(tag);
  });

  // clear this.tagGroupList
  tagGroupList.value = [];
  tagGroupList.value = Object.keys(tagGroupMap).map(key => ({
    group: key,
    tags: tagGroupMap[key]
  }));
};

const getRouteList = async () => {
            // {
            //   "Imgsrc": "https://shoplineimg.com/614d51f4e46907003ed5765f/64d9f64f37fff70016ceed19/2000x.png?",
            //   "Description": "",
            //   "Route": "id_T_123456",
            //   "Name": "行銷動線B",
            //   "TagGroups_order": [
            //     "風格",
            //     "版型"
            //   ]
            // },
  const response = await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_routes?Brand=INFS&Per_Page=100&Page=1');
  routeList.value = [...response.data.models];
};

const getProductList = async () => {
  const response = await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_products?Brand=INFS&Per_Page=100&Page=1');
  rawList.value = response.data.models;
  productList.value = [...response.data.models];
};

// const setEditRouteProduct = (group) =>{
//   editProduct.value={...group}
// };

const setEditProduct = (product = {
  id: String(new Date().getTime()),
  Tags: {},
  Routes: [],
}, toToggleModal = true, toggleModalName = 'editModal') => {
  editProduct.value = Object.assign({
    id: String(new Date().getTime()),
    Tags: {},
    Routes: [],
  }, JSON.parse(JSON.stringify(product)));

  if (toToggleModal) {
    toggleModal(toggleModalName);
  }
};

const toggleModal = (modalId) => {
    $(`#${modalId}`).modal('toggle') 
    
  }

  const getRouteName = (routes) => {
  return routes?.[0].Name || null
};

const getTagGroupByRoute = (routeKey) => {
  const route = routeList.value.find(r => r.Route === routeKey);
  if (!route) return [];

  return tagGroupList.value.filter(tagGroup => route.TagGroups_order.includes(tagGroup.group));
};

const hasTag = (product, tagGroupName, tag) => {
  return product.Tags[tagGroupName] && product.Tags[tagGroupName].some(t => t.Tag === tag.Tag);
};

const removeTag = (product, tagGroupName, tag) => {
  const index = product.Tags[tagGroupName].findIndex(t => t.Tag === tag.Tag);
  if (index !== -1) {
    product.Tags[tagGroupName].splice(index, 1);
    saveProduct({
      Routes: product.Routes,
      Tags: product.Tags,
      id: product.id,
    });
  }
};

// const openDropdown=(selector)=> {

// $(selector).dropdown('hide')

// };

const closeDropdown=(selector)=> {

$(selector).dropdown('hide')

};

const setProductRoute = (product, route) => {
  product.Routes = [route];
  // product.Tags = {};

  saveProduct({
    Routes: product.Routes,
    Tags: product.Tags,
    id: product.id,
  });
};


const setTag = (product, tagGroupName, tag) => {
  if (!product.Tags[tagGroupName]) {
    product.Tags[tagGroupName] = [];
  }
  const index = product.Tags[tagGroupName].findIndex(t => t.Tag === tag.Tag)
  if (index === -1) {
    product.Tags[tagGroupName].push(tag);
  } else {
    product.Tags[tagGroupName].splice(index, 1);
  }

  saveProduct({
    Product: product.Product,
    Tags: product.Tags,
    id: product.id,
  });
};

// 根据产品列出标签
const tagListByProduct = (product) => {
  const tagList = [];
  for (const key in product.Tags) {
    product.Tags[key].forEach(tag => {
      tagList.push({ tag, group: key });
    });
  }

  return JSON.parse(JSON.stringify(tagList));
};

// 保存产品
const saveProduct = async (updateData) => {
  const payload = {
    Brand: 'INFS',
    ...updateData,
  };
  const response = await axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_product', payload);
  console.log(response);
  getProductList();
};

const preview=()=>{
  pre.value = !pre.value
}

const deleteProduct = async () => {
    const response = await axios.delete(`https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/del_product?Brand=INFS&id=${editProduct.value.id}`);
    console.log(response);
  getProductList();
  setEditProduct({}, true, 'deleteModal');
};
onMounted(() => {
  getTagGroupList();
  getRouteList();
  getProductList();
});

</script>

<template>
<LayoutAuthenticated>
  <SectionMain>
    <SectionTitleLineWithButton :icon="mdiAccount" title="產品管理" main>
      &nbsp;
  </SectionTitleLineWithButton>

  <div class="container-fluid pb-3">
    
    <div v-for="(product,productIdx) in productList"
         :key="productIdx"
         class="row mb-3">
        <!-- render tags -->
        <div class="col-12">
            <div class="h-100 flex-grow-1 bg-white rounded container-fluid">
                <div class="row d-flex align-items-center py-3">
                    <!-- img -->
                    <div class="col-2 col-md-1 flex-grow-0 mb-4 mb-md-0">
                        <div class="profile-img">
                            <div class="img-circle-wrapper">
                                <div class="img-circle img-fluid bg-gray-light"
                                     :class="product.Imgsrc ? '' : 'd-none'"></div>
                                <img class="img-circle img-fluid"
                                     :class="product.Imgsrc ? '' : 'd-none'"
                                     :src="product.Imgsrc"
                                     alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-8 col-md-2 text-body font-bold mb-4 mb-md-0">{{product.ItemName}}</div>

                    <!-- delete -->
                    <div class="d-block d-md-none col-2 text-right">
                        <div class="h3 text-danger d-inline-flex align-items-center cursor-pointer mr-4"
                             @click="setEditProduct(product, true, 'deleteModal')">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="1em"
                                 height="1em"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                            </svg>
                        </div>
                    </div>

                    <div class="col-12 px-md-0 col-md flex-shrink-0 flex-grow-1 d-flex flex-column flex-md-row align-items-stretch">
                        <!-- route -->
                        <div class="dropdown mr-md-2 mr-lg-3 mb-1 mb-md-0">
                            <button class="w-100 btn btn-primary rounded-pill dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-expanded="false">
                                {{getRouteName(product.Routes) || '選擇動線'}}
                            </button>
                            <div class="dropdown-menu">
                                <div class="dropdown-item"
                                     disabled>
                                    選擇欲顯示的詢問動線
                                </div>
                                <div v-for="(route,idx) in routeList"
                                     :key="route.Route"
                                     class="dropdown-item"
                                     @click="setProductRoute(product, route)">
                                    {{route.Name}} ({{route.TagGroups_order.join(' - ')}})
                                </div>
                            </div>
                        </div>

                        <!-- tag group -->
                        <div class="dropdown mr-md-2 mb-1 mb-md-0">
                            <button class="w-100 btn btn-primary rounded-pill dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-expanded="false">
                                {{'新增標籤'}}
                            </button>
                            <div :id="`tagDropdownMenu${productIdx}`"
                                 class="dropdown-menu p-2"
                                 style="min-width: 400px;"
                                 onclick="event.stopPropagation()">
                                <div class="text-right">
                                    <button type="button"
                                            class="btn btn-sm rounded-circle"
                                            @click.stop="closeDropdown(`#tagDropdownMenu${productIdx}`)">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="1em"
                                             height="1em"
                                             viewBox="0 0 18 18">
                                            <path fill="none"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="m15.5 15.5l-10-10zm0-10l-10 10" />
                                        </svg>
                                    </button>
                                </div>
                                <div v-for="tagGroup in tagGroupList"
                                     :key="tagGroup"
                                     class="d-flex flex-column mb-2">

                                    <div class="text-gray ml-2 mb-2">
                                        {{tagGroup.group || '新增標籤'}}
                                    </div>
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div v-for="tag in tagGroup.tags"
                                                 :key="tag"
                                                 class="col-4 p-0 px-1 mb-2">
                                                <div class="w-100 rounded-pill cursor-pointer d-flex align-items-center border
                                     position-relative"
                                                     :class="hasTag(product, tagGroup.group, tag) ? 'bg-secondary text-white' : 'bg-white text-secondary'"
                                                     @click.stop="setTag(product, tagGroup.group, tag)"
                                                     style="line-height: 1;">
                                                    <div v-if="!hasTag(product, tagGroup.group, tag)"
                                                         class="position-absolute left-0"
                                                         style="top: 50%; transform: translate(50%, -50%);">
                                                        <!-- plus -->
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             width="1em"
                                                             height="1em"
                                                             viewBox="0 0 24 24">
                                                            <g fill="none">
                                                                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                                                <path fill="currentColor"
                                                                      d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div class="w-100 text-center d-inline-flex align-items-center px-3 px-md-4 py-1 py-md-2">
                                                        <div class="profile-img mr-1"
                                                             style="border: none; width: 20px; min-width: 20px;">
                                                            <div class="img-circle-wrapper">
                                                                <div class="img-circle img-fluid"
                                                                     :class="tag.Imgsrc ? '' : 'd-none'"></div>
                                                                <img class="img-circle img-fluid"
                                                                     :class="tag.Imgsrc ? '' : 'd-none'"
                                                                     :src="tag.Imgsrc"
                                                                     alt="">
                                                            </div>
                                                        </div>
                                                        {{tag.Name}}
                                                    </div>
                                                    <div v-if="hasTag(product, tagGroup.group, tag)"
                                                         class="position-absolute right-0"
                                                         style="top: 50%; transform: translate(-50%, -50%);">
                                                        <!-- cross -->
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             width="1em"
                                                             height="1em"
                                                             viewBox="0 0 18 18">
                                                            <path fill="none"
                                                                  stroke="currentColor"
                                                                  stroke-linecap="round"
                                                                  stroke-linejoin="round"
                                                                  d="m15.5 15.5l-10-10zm0-10l-10 10" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- tags -->
                        <div class="container-fluid px-2 mr-md-2">
                            <div class="row">
                                <div v-for="tagObj in JSON.parse(JSON.stringify(tagListByProduct(product))).slice(0, 4)"
                                     :key="tagObj"
                                     class="col-12 col-md-3 p-0 px-1 mb-1 mb-md-0">
                                    <div class="w-100 rounded-pill cursor-pointer d-flex align-items-center border
                                     position-relative"
                                         :class="true ? 'bg-secondary text-white' : 'bg-white text-secondary'"
                                         @click="removeTag(product, tagObj.tag.TagGroup, tagObj.tag)">
                                        <div v-if="!true"
                                             class="position-absolute left-0"
                                             style="top: 50%; transform: translate(50%, -50%);">
                                            <!-- plus -->
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="1em"
                                                 height="1em"
                                                 viewBox="0 0 24 24">
                                                <g fill="none">
                                                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                                    <path fill="currentColor"
                                                          d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="w-100 text-center d-inline-flex align-items-center px-3 px-md-4 py-1 py-md-2">
                                            <div class="profile-img mr-1 ml-0"
                                                 style="border: none; width: 20px; min-width: 20px;">
                                                <div class="img-circle-wrapper">
                                                    <div class="img-circle img-fluid bg-white border-primary"
                                                         :class="tagObj.tag?.Imgsrc ? 'd-none' : ''"></div>
                                                    <img class="img-circle img-fluid"
                                                         :class="tagObj.tag?.Imgsrc ? '' : 'd-none'"
                                                         :src="tagObj.tag?.Imgsrc"
                                                         alt="">
                                                </div>
                                            </div>
                                            {{tagObj.tag?.Name}}
                                        </div>
                                        <div v-if="true"
                                             class="position-absolute right-0"
                                             style="top: 50%; transform: translate(-50%, -50%);">
                                            <!-- cross -->
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="1em"
                                                 height="1em"
                                                 viewBox="0 0 18 18">
                                                <path fill="none"
                                                      stroke="currentColor"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="m15.5 15.5l-10-10zm0-10l-10 10" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="collapse row"
                                 :id="`collapseTag${productIdx}`">
                                <div v-for="tagObj in JSON.parse(JSON.stringify(tagListByProduct(product))).slice(4)"
                                     :key="tagObj"
                                     class="col-12 col-md-3 p-0 px-1 mb-1 mb-md-0">
                                    <div class="w-100 rounded-pill cursor-pointer d-flex align-items-center border
                                      position-relative"
                                         :class="true ? 'bg-secondary text-white' : 'bg-white text-secondary'"
                                         @click="removeTag(product, tagObj.tag.TagGroup, tagObj.tag)">
                                        <div v-if="!true"
                                             class="position-absolute left-0"
                                             style="top: 50%; transform: translate(50%, -50%);">
                                            <!-- plus -->
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="1em"
                                                 height="1em"
                                                 viewBox="0 0 24 24">
                                                <g fill="none">
                                                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                                    <path fill="currentColor"
                                                          d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z" />
                                                </g>
                                            </svg>
                                        </div>
                                        <!-- <span class="w-100 text-center d-inline-block px-3 px-md-4 py-1 py-md-2">
                                            {{tagObj.tag?.Name}}
                                        </span> -->
                                        <div class="w-100 text-center d-inline-flex align-items-center px-3 px-md-4 py-1 py-md-2">
                                            <div class="profile-img mr-1 ml-0"
                                                 style="border: none; width: 20px; min-width: 20px;">
                                                <div class="img-circle-wrapper">
                                                    <div class="img-circle img-fluid bg-white border-primary"
                                                         :class="tagObj.tag?.Imgsrc ? 'd-none' : ''"></div>
                                                    <img class="img-circle img-fluid"
                                                         :class="tagObj.tag?.Imgsrc ? '' : 'd-none'"
                                                         :src="tagObj.tag?.Imgsrc"
                                                         alt="">
                                                </div>
                                            </div>
                                            {{tagObj.tag?.Name}}
                                        </div>
                                        <div v-if="true"
                                             class="position-absolute right-0"
                                             style="top: 50%; transform: translate(-50%, -50%);">
                                            <!-- cross -->
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="1em"
                                                 height="1em"
                                                 viewBox="0 0 18 18">
                                                <path fill="none"
                                                      stroke="currentColor"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="m15.5 15.5l-10-10zm0-10l-10 10" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- more tag button-->
                        <div v-if="tagListByProduct(product).length > 4"
                             class="flex-shrink-0">
                            <button class="btn h4 mb-0 p-0 bg-white border d-flex align-items-center justify-content-center rounded-pill rounded-md-circle"
                                    type="button"
                                    data-toggle="collapse"
                                    :data-target="`#collapseTag${productIdx}`"
                                    aria-expanded="false"
                                    :aria-controls="`collapseTag${productIdx}`"
                                    style="width: 2rem; height: 2rem;">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="1em"
                                     height="1em"
                                     viewBox="0 0 20 20">
                                    <path fill="currentColor"
                                          d="M14 10.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0" />
                                </svg>
                            </button>
                            <button class="btn h4 mb-0 p-0 bg-white border d-flex align-items-center justify-content-center rounded-pill rounded-md-circle"
                                    type="button"
                                    @click="preview()"
                                    style="width: 2rem; height: 2rem;">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="1em"
                                     height="1em"
                                     viewBox="0 0 20 20">
                                    <path fill="currentColor"
                                          d="M14 10.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- delete -->
                    <div class="d-none d-md-block col-auto text-right">
                        <div class="h3 text-danger d-inline-flex align-items-center cursor-pointer"
                             @click="setEditProduct(product, true, 'deleteModal')">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="1em"
                                 height="1em"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- deleteModal -->
    <div class="modal fade"
         id="deleteModal"
         tabindex="-1"
         role="dialog"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"
             role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">確認刪除</h5>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>是否確認刪除此產品？</h5>
                </div>
                <div class="modal-footer border-0">
                    <button type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal">取消操作</button>
                    <button type="button"
                            class="btn btn-primary"
                            @click="deleteProduct()">刪除</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- preview -->
<div v-if="pre" style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 2147483647; background: rgba(0, 0, 0, 0.5); transform: none;">
  <div id="inffits_cblock" style='z-index:60;display:block;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;'>
      <div id="tryon"><iframe id="inffits_tryon_window" style=" width:100%; height:100%; visibility:visible; position:relative; border:none; outline:none;  z-index:14;border-radius:10px;box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;" :src="iframeSrc"></iframe></div>
  </div>
</div>
    </SectionMain>
</LayoutAuthenticated>
</template>

<style scoped>
@import url('@/css/css-in/bootstrap-variables.css');
@import url('@/css/css-in/bootstrap.min.css');
@import url('@/css/css-in/frame.css');
@import url('@/css/css-in/style.css');
@import url('@/css/css-in/style.min.css');
.collapse{
  visibility: visible;
}

@media screen and (min-height: 721px) {
  #inffits_cblock {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 720px;
    width: 480px !important;
  }
  #tryon {
    margin: auto;
    height: 720px;
    width: 480px !important;
  }
}

@media screen and (min-width: 441px) and (max-height: 720px) {
  #inffits_cblock {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 700px;
    width: 440px !important;
  }
  #tryon {
    margin: auto;
    height: 700px;
    width: 440px !important;
  }
}

@media screen and (min-width: 401px) and (max-width: 440px) {
  #inffits_cblock {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 640px;
    width: 400px !important;
  }
  #tryon {
    margin: auto;
    height: 640px;
    width: 400px !important;
  }
}

@media screen and (min-width: 361px) and (max-width: 400px) {
  #inffits_cblock {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 600px;
    width: 360px !important;
  }
  #tryon {
    margin: auto;
    height: 600px;
    width: 360px !important;
  }
}

@media screen and (max-width: 360px) {
  #inffits_cblock {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 580px;
    width: 320px !important;
  }
  #tryon {
    margin: auto;
    height: 580px;
    width: 320px !important;
  }
}
</style>