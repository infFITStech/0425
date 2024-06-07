<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import { mdiOpenInNew, mdiStoreCogOutline, mdiPencilOutline } from '@mdi/js';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/userStore';
import BaseIcon from '@/components/BaseIcon.vue';
import { useApiStore } from '@/stores/apiFuncs.js';
import { useToast } from "vue-toastification";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();
const setting={
  toastClassName: 'blackToast',
  bodyClassName: ['blackToast'],
  position: "bottom-right",
  timeout: 1619,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
  
}
const api= useApiStore();
const tooltipText="請選擇動線"
const authStore = useAuthStore();
const router = useRouter();
const iframeSrc = router.resolve({ name: 'IframeContainer'}).href;
// const iframeSrc=ref('http://127.0.0.1:5501/iframe_container_module.html')
const userBrand=ref(authStore.MainConfig.BRAND)
const batch_choosed_tags = ref({Tags:{}});
const batchProducts = ref([]);
const searchQuery = ref('');
const searchTags = ref('');
const filteredProducts = computed(() => {

    return api.productList.filter(product => 
        product.ItemName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const reset_batch_choosed_tags = () => {
  filteredTagGroups.value.forEach(group => {
    let groupName = group.group;
    let filteredTags = group.tags;

    // 如果 batchChoosedTagGroup 中存在相應的 group
    if (batch_choosed_tags.value.Tags[groupName]) {
        // 過濾掉 batchChoosedTagGroup.Tags[groupName] 中與 filteredTags 相同的標籤
        batch_choosed_tags.value.Tags[groupName] = batch_choosed_tags.value.Tags[groupName].filter(batchTag => 
            !filteredTags.some(filteredTag => filteredTag.Tag === batchTag.Tag)
        );

        // 如果該 group 中已經沒有標籤了，則刪除該 group
        if (batch_choosed_tags.value.Tags[groupName].length === 0) {
            delete batch_choosed_tags.value.Tags[groupName];
        }
    }
});
}
// 指搜尋標籤
// const filteredTagGroups = computed(() => {
//     if (!searchTags.value) {
//         return api.tagGroupList;
//     }
//     return api.tagGroupList.map(group => ({
//         group: group.group,
//         tags: group.tags.filter(tag => tag.Name.toLowerCase().includes(searchTags.value.toLowerCase()))
//     })).filter(group => group.tags.length > 0);
// });

//標籤和標籤主題都搜尋
const filteredTagGroups = computed(() => {
    if (!searchTags.value) {
        return api.tagGroupList;
    }
    const searchLower = searchTags.value.toLowerCase();
    return api.tagGroupList.reduce((filteredGroups, group) => {
        const matchesGroup = group.group.toLowerCase().includes(searchLower);
        const filteredTags = group.tags.filter(tag => tag.Name.toLowerCase().includes(searchLower));
        if (matchesGroup || filteredTags.length > 0) {
            filteredGroups.push({
                ...group,
                tags: matchesGroup ? group.tags : filteredTags
            });
        }
        return filteredGroups;
    }, []);
});

const tagNum_row=ref(4);
const pre = ref(false)

const editProduct = ref({
  Route: '',
  Tags: {}
});

window.addEventListener('resize', () => {
  if (window.innerWidth < 990) {
    tagNum_row.value = 2;
  }
  else if (window.innerWidth < 1150) {
    tagNum_row.value = 3;
  } 
  else {
    tagNum_row.value = 4;
  }
});








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



  const getRouteName = (routes, product) => {


    return api.routeList.find(item => item.Route === routes?.[0].Route).Name || null

  

};

// const getTagGroupByRoute = (routeKey) => {
//   const route = api.routeList.find(r => r.Route === routeKey);
//   if (!route) return [];

//   return tagGroupList.value.filter(tagGroup => route.TagGroups_order.includes(tagGroup.group));
// };

const hasTag = (product, tagGroupName, tag) => {
  return product.Tags[tagGroupName] && product.Tags[tagGroupName].some(t => t.Tag === tag.Tag);
};

const removeTag = async(product, tagGroupName, tag) => {
  const index = product.Tags[tagGroupName].findIndex(t => t.Tag === tag.Tag);
  if (index !== -1) {
    product.Tags[tagGroupName].splice(index, 1);
    await api.saveProduct({
      Routes: product.Routes,
      Tags: product.Tags,
      id: product.id,
    });
  }
};

// const openDropdown=(selector)=> {

// $(selector).dropdown('hide')



const getTagName = (tagObj) => {
  try{

    return tagObj.tag.Name

  }
  catch(err)
  {
    console.error(err, tagObj)
  }
  
}


const closeDropdown=(selector)=> {

$(selector).dropdown('hide')

};

const setProductRoute = async(product, route) => {
  product.Routes = [route];
  // product.Tags = {};

  await api.saveProduct({
    Routes: product.Routes,
    Tags: product.Tags,
    id: product.id,
  });
};

const close_preview = () => {
  $('#preview_box').fadeOut();
  setTimeout(() => {
    pre.value=false;
    }, 400); 
  
}

const setBatchChoosedTags = (product, tagGroupName, tag) => {
  if (!product.Tags[tagGroupName]) {
    product.Tags[tagGroupName] = [];
  }
  const index = product.Tags[tagGroupName].findIndex(t => t.Tag === tag.Tag)
  if (index === -1) {
    product.Tags[tagGroupName].push(tag);
  } 
  else{
    product.Tags[tagGroupName].splice(index, 1);
  }
  console.log("setted")
  }
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

  api.saveProduct({
    Product: product.Product,
    Tags: product.Tags,
    id: product.id,
  });
};


function findTagInData(targetTag) {
  for (let group of api.tagGroupList) {
        for (let tag of group.tags) {
            if (tag.Tag == targetTag) {
                return tag;
            }
        }
    }
    return null;
   
}

// 根据产品列出标签
const tagListByProduct = (product) => {
  const tagList = [];
  for (const key in product.Tags) {
    product.Tags[key].forEach((tag) => {
      
      const tagIn =  findTagInData(tag.Tag);
      if(tagIn!=null)
      {
        tagList.push({ tag: tagIn , group: key }); 
        
      }
      
    });
  }
  
  

  return JSON.parse(JSON.stringify(tagList));
};

const myiframe = ref(null);



const preview=async(product)=>{
  //每次preview再設一次route給product(更改route的taggroup之後，並未同步更新商品內的資訊)
  const foundObject = api.routeList.find(item => item.Route === product.Routes[0].Route);
  console.log(foundObject, "pppp")
  await setProductRoute(product, foundObject);
  
  $('#preview_box').fadeIn();
  var iframe_preview_obj={};
  iframe_preview_obj['id']=product.ClothID;
  iframe_preview_obj['header']='from_preview';
  iframe_preview_obj['brand']=product.Brand;
  if (myiframe.value) {
    myiframe.value.contentWindow.postMessage(iframe_preview_obj, "*");
  }
}

const updateMktOnline=(newMktOnline, id)=> {
   const requestBody = {Brand: userBrand.value , id: id,Resource:'Extensions_Product_Tag' }
  let updateData = {
      mktOnline: newMktOnline,
  };
  requestBody.update_data = updateData;

  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify(requestBody)
  };

  fetch('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_status', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

};

const deleteProduct = async () => {
    const response = await axios.delete(`https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/del_product?Brand=`+userBrand.value+`&id=${editProduct.value.id}`);
    console.log(response);
  api.getProductList();
  setEditProduct({}, true, 'deleteModal');
};

const batchEdit = async(addOrDelete) => {
  mainStore.setIsLoading(true);
  const toast = useToast();
  console.log(batchProducts.value, batch_choosed_tags.value, addOrDelete);

 
  const operations = batchProducts.value.map(async (batch_product_id) => {
    var product = api.productList.find(product => product.id === batch_product_id);
    var tag
    if (addOrDelete === 'add') {
      for (let tagGroup in batch_choosed_tags.value.Tags) {
        for (let i in batch_choosed_tags.value.Tags[tagGroup]) {
          tag = batch_choosed_tags.value.Tags[tagGroup][i];
          if (!product.Tags[tagGroup]) {
            product.Tags[tagGroup] = [];
          }
          const index = product.Tags[tagGroup].findIndex(t => t.Tag === tag.Tag);
          if (index === -1) {
            product.Tags[tagGroup].push(tag);
          }
        }
      }
    } 
    else if (addOrDelete === 'delete') 
    {
      for (let tagGroup in batch_choosed_tags.value.Tags) {
        for (let i in batch_choosed_tags.value.Tags[tagGroup]) {
          tag = batch_choosed_tags.value.Tags[tagGroup][i];
          if (!product.Tags[tagGroup]) {
            product.Tags[tagGroup] = [];
          }
          const index = product.Tags[tagGroup].findIndex(t => t.Tag === tag.Tag);
          if (index !== -1) {
            product.Tags[tagGroup].splice(index, 1);
          }
        }
      }
    }

    // 儲存產品資訊
    return api.saveProduct({
      Product: product.Product,
      Tags: product.Tags,
      id: product.id,
    });
  });

  // 等待所有產品更新操作完成
  await Promise.all(operations);

  // 所有操作完成後顯示toast
  if (addOrDelete === 'add') {
    toast("成功新增標籤", setting);
  } else if (addOrDelete === 'delete') {
    toast("成功刪除標籤", setting);
  }

  // 清空選擇的標籤和產品
  batch_choosed_tags.value = { Tags: {} };
  batchProducts.value = [];
  searchQuery.value = '';
  searchTags.value = '';
  mainStore.setIsLoading(false);
};

const batch_edit=()=>{
  toggleModal('batchModal');
}
onMounted(() => {

  if (window.innerWidth < 990) {
    tagNum_row.value = 2;
  }
  else if (window.innerWidth < 1150) {
    tagNum_row.value = 3;
  } 
  else {
    tagNum_row.value = 4;
  }



});
api.getTagGroupList();
  api.getRouteList();
  api.getProductList();


</script>

<template>
<LayoutAuthenticated>
  <SectionMain>

    <SectionTitleLineWithButton :icon="mdiStoreCogOutline" title="官網及商品管理" main>
      &nbsp;
  </SectionTitleLineWithButton>
  <div class="container-fluid pb-3">
    
    <div v-for="(b,bIdx) in api.brandList"
         :key="bIdx"
         class="row mb-3">
        <!-- render tags -->
        <div class="col-12 ">
            <div class="h-100 flex-grow-1 bg-white rounded container-fluid">
                <div class="row d-flex align-items-center py-4">
                    <!-- img -->
                    <div class="col-2 col-md-1 flex-grow-0 mb-4 mb-md-0 px-3">
                        <div class="profile-img m-0" style="border-style:none;  box-shadow : rgba(0,0,0,0.15) 0 2px 8px;">
                            <div class="img-circle-wrapper">
                                <div class="img-circle img-fluid bg-gray-light"
                                     :class="authStore.MainConfig.Logo ? '' : 'd-none'"></div>
                                <img class="img-circle img-fluid"
                                     :class="authStore.MainConfig.Logo ? '' : 'd-none'"
                                     :src="authStore.MainConfig.Logo"
                                     alt="">
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex-row col-7 col-md-2 text-body font-bold mb-4 mb-md-0 px-0" style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none; display:flex; " >
                      <span class="ItemName-width" style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none; display:flex; width:calc(100% - 16px)">{{authStore.MainConfig.BrandName}}</span>
                      <!-- url -->
                      <a href="product.Link" target="_blank" style="display:flex; padding-left: 3px; ">
                      <svg viewBox="0 0 24 24" width="20px" height="20px" class="inline-block">
                        <path fill="currentColor" :d="mdiOpenInNew" />
                      </svg>
                      </a>
                    </div>

                  <div class="col-3 d-flex d-md-none text-right align-items-center mb-4" style="justify-content:flex-end">
                    <!-- preview -->
                    <div class="d-flex d-md-none mx-3" >
                      <div class="flex-shrink-0 mr-1" style="display:inline-flex">
                
                        <button class="btn h4 mb-0 pl-2 bg-white border d-flex align-items-center justify-content-center rounded-pill rounded-md-circle"
                                type="button"
                                @click="()=>{preview( b);}"
                                style="  box-shadow : rgba(0,0,0,0.15) 0 2px 8px; font-size:12px
                                "
                                v-tooltip="tooltipText"
                                :disabled="(b.Routes[0]&&Object.keys(b.Routes[0]).length === 0)"
                                >
                              <img src="@/img/inffits_f_black.png" alt="f" class="m-1" style="height: 10px; width:auto; vertical-align: middle; margin-right: 3px; "> 預覽
                        </button>
                        </div>
                    </div>

                  </div>

                    

                  <div class="col-12 px-md-0 col-md flex-shrink-0 flex-grow-1 d-flex flex-column flex-md-row align-items-center " style="justify-content: start;" >
                    <!-- route -->
                  
                    <div class="dropdown mr-md-1 mr-lg-1 mb-1 mb-md-0 ml-md-1 px-0 border rounded-pill btn brand-route-choose"
                    style="color: gray; text-align: left;">
                    <span class="w-100"
                    type="button"
                      data-toggle="dropdown"
                        aria-expanded="false">
                        
                        <button class="pl-2"
                        style="color: gray; white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none; width: calc(100% - 1em);">
                            {{(b.Routes[0]&&Object.keys(b.Routes[0]).length !== 0)?getRouteName(b.Routes, b):'選擇動線'}}
                        </button>
                        <button class="dropdown-toggle">
                        </button>
                    </span>

                    <div class="dropdown-menu" id="brand-route-menu" >
                      <div class="dropdown-item"
                           disabled>
                          選擇欲顯示的詢問動線
                      </div>
                      <div v-for="(route,idx) in api.routeList"
                           :key="route.Route"
                           class="dropdown-item"
                           @click="setProductRoute(b, route)">
                          {{route.Name}} ({{route.TagGroups_order.join(' - ')}})
                      </div>
                  </div>

                    </div>   

                      

                </div>
                    <!-- delete -->
                    <div class="d-none d-md-flex col-auto text-right pr-2 pl-0 align-items-center">
                        <!-- preview tag button-->
                         <div class="flex-shrink-0 mr-1" style="display:inline-flex">
                
                        <button class="btn h4 mb-0 pl-2 bg-white border d-flex align-items-center justify-content-center rounded-pill rounded-md-circle"
                                type="button"
                                @click="()=>{preview( b);}"
                                style="  box-shadow : rgba(0,0,0,0.15) 0 2px 8px; font-size:12px"
                                v-tooltip="tooltipText"
                                :disabled="(b.Routes[0]&&Object.keys(b.Routes[0]).length === 0)"
                                >
                              <img src="@/img/inffits_f_black.png" alt="f" class="m-1" style="height: 10px; width:auto; vertical-align: middle; margin-right: 3px; "> 預覽
                        </button>
                        </div>

                        <!-- <div class="h3 text-danger d-inline-flex align-items-center cursor-pointer mb-0"
                             @click="setEditBrand(b, true, 'deleteModal')">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="0.9em"
                                 height="0.9em"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                            </svg>
                        </div> -->
                         

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>



  <SectionTitleLineWithButton  title="商品管理" > &emsp;
    <!-- batch edit -->
          <div class="font-bold bg-white border d-flex align-items-center justify-content-center cursor-pointer tag-title " 
          style="max-width:max-content; box-shadow : rgba(0,0,0,0.15) 0 2px 8px; font-weight: 500; color:black;
          padding: 5px 10px;
            border-radius: 3px;
            color: #333366;
            text-align: center;"
          @click="batch_edit()">
              批次設定標籤
              <!-- <BaseIcon :path="mdiPencilOutline" class="mx-2" /> -->
          </div>
      <!----> 
    </SectionTitleLineWithButton>


  <div class="container-fluid pb-3">
    

    <div v-for="(product,productIdx) in api.productList"
         :key="productIdx"
         class="row mb-3">
        <!-- render tags -->
        <div class="col-12">
            <div class="h-100 flex-grow-1 bg-white rounded container-fluid">
                <div class="row d-flex align-items-center py-4">
                    <!-- img -->
                    <div class="col-2 col-md-1 flex-grow-0 mb-4 mb-md-0 px-3">
                        <div class="profile-img m-0" style="border-style:none;  box-shadow : rgba(0,0,0,0.15) 0 2px 8px;">
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
                    <div class="flex-row col-7 col-md-2 text-body font-bold mb-4 mb-md-0 px-0" style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none; display:flex; " >
                      <span class="ItemName-width" style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none; display:flex; width:calc(100% - 16px)">{{product.ItemName}}</span>
                      <!-- url -->
                      <a :href="product.Link" target="_blank" style="display:flex; padding-left: 3px; ">
                      <svg viewBox="0 0 24 24" width="20px" height="20px" class="inline-block">
                        <path fill="currentColor" :d="mdiOpenInNew" />
                      </svg>
                      </a>
                    </div>

                  <div class="col-3 d-flex d-md-none text-right align-items-center mb-4" style="justify-content:flex-end">
                    <!-- preview -->
                    <div class="d-flex d-md-none mx-3" >
                      <div class="flex-shrink-0 mr-1" style="display:inline-flex">
                
                        <button class="btn h4 mb-0 pl-2 bg-white border d-flex align-items-center justify-content-center rounded-pill rounded-md-circle"
                                type="button"
                                @click="preview( product)"
                                style="  box-shadow : rgba(0,0,0,0.15) 0 2px 8px; font-size:12px
                                "
                                v-tooltip="tooltipText"
                                :disabled="(product.Routes[0]&&Object.keys(product.Routes[0]).length === 0)"
                                >
                              <img src="@/img/inffits_f_black.png" alt="f" class="m-1" style="height: 10px; width:auto; vertical-align: middle; margin-right: 3px; "> 預覽
                        </button>
                        </div>
                    </div>
                    <!-- delete -->
                    <div class="d-flex d-md-none text-left" >
                        <!-- <div class="h3 mb-0 text-danger d-inline-flex align-items-center cursor-pointer "
                             @click="setEditProduct(product, true, 'deleteModal')">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="1em"
                                 height="1em"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                            </svg>
                        </div> -->
                        
                        <label class="h3 text-danger d-inline-flex align-items-center cursor-pointer mb-0" 
                             >
                            <input :disabled="(product.Routes[0]&&Object.keys(product.Routes[0]).length === 0)" type="checkbox" value="" class="sr-only peer" v-model="product.mktOnline" @change="updateMktOnline(product.mktOnline, product.id) " >
                            <div class="toggle-switch relative h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                                  style=""
                                  :class="(product.Routes[0]&&Object.keys(product.Routes[0]).length === 0)? 'disabled' : ''"
                                 >
                            </div>
                            <!-- {{ console.log(product, "aaaaaaaaaaaaaaaaaaa") }} -->
                      </label>

                    </div>
                  </div>

                    <div class="col-12 px-md-0 col-md flex-shrink-0 flex-grow-1 d-flex flex-column flex-md-row align-items-center" >
                        <!-- route -->
                      
                        <div class="dropdown mr-md-1 mr-lg-1 mb-1 mb-md-0 ml-md-1 w100-max768 px-0 border rounded-pill btn"
                        style="color: gray; text-align: left">
                        <span class="w-100"
                        type="button"
                          data-toggle="dropdown"
                            aria-expanded="false">
                            
                            <button class="pl-2"
                            style="color: gray; white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none; width: calc(100% - 1em);">
                                {{(product.Routes[0]&&Object.keys(product.Routes[0]).length !== 0)?getRouteName(product.Routes, product):'選擇動線'}}
                            </button>
                            <button class="dropdown-toggle">
                            </button>
                        </span>

                        <div class="dropdown-menu" id="route-menu">
                          <div class="dropdown-item"
                               disabled>
                              選擇欲顯示的詢問動線
                          </div>
                          <div v-for="(route,idx) in api.routeList"
                               :key="route.Route"
                               class="dropdown-item"
                               @click="setProductRoute(product, route)">
                              {{route.Name}} ({{route.TagGroups_order.join(' - ')}})
                          </div>
                      </div>

                        </div>   
                        
                  
                       

                     
                        <!-- tag group -->
                        <div class="dropdown mr-md-1 mb-1 mb-md-0 w100-max768 px-0 border btn"
                        style="border-radius: 0.25rem ; color: gray; text-align: left">
                        <span class="w-100"
                             type="button"
                            data-toggle="dropdown"
                            aria-expanded="false">
                            <button class="pl-2"
                            style="color: gray; white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none;  width: calc(100% - 1em);">
                                {{'新增標籤'}}
                            </button>

                            <button class="dropdown-toggle ">

                            </button>
                          </span>
                            <div :id="`tagDropdownMenu${productIdx}`"
                                 class="dropdown-menu p-2 "
                                 style="min-width: 400px; max-height: 500px; overflow-y: scroll; scrollbar-width: thin; cursor:default;"
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
                                <div v-for="tagGroup in api.tagGroupList"
                                     :key="tagGroup"
                                     class="d-flex flex-column mb-2">

                                    <div class="text-gray ml-2 mb-2">
                                        {{tagGroup.group}}
                                    </div>
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div v-for="tag in tagGroup.tags"
                                                 :key="tag"
                                                 class="col-4 p-0 px-1 mb-2">
                                                <div class="w-100 cursor-pointer d-flex align-items-center border
                                     position-relative"
                                                     :class="hasTag(product, tagGroup.group, tag) ? 'bg-secondary text-white' : ' text-secondary'"
                                                     :style="hasTag(product, tagGroup.group, tag) ? '':'backgroundColor: rgb(243,243,243);'"
                                                     @click.stop="setTag(product, tagGroup.group, tag)"
                                                     style="line-height: 1; border-radius: 6px;">
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
                                                    <div class="w-100 text-center d-inline-flex align-items-center px-3 px-md-4 py-1 py-md-1" style="line-height: 1.5; ">

                                                        <div class="profile-img m-1 "
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

                                                        <div style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none;">{{tag.Name}}</div>
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
                        <div class="container-fluid px-0 mr-md-2 border py-1 px-2" style="border-radius: 13px; min-height:39px">
                            <div class="row m-0">
                                <div v-for="tagObj in JSON.parse(JSON.stringify(tagListByProduct(product))).slice(0, tagNum_row)"
                                     :key="tagObj"
                                     class="col-12 col-md-3 p-0 px-1 mb-1 mb-md-0">
                                     <!-- const userBrand=ref(authStore.MainConfig.BRAND);
 -->
                                    <div 
                                        
                                        class="w-100 d-flex align-items-center
                                         position-relative"                                       
                                         :class="true ? 'bg-white text-gray' : 'bg-white text-secondary'"                                        
                                         style="cursor: default;"
                                         
                                        >
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
                                        <div class="w-100 text-center d-inline-flex align-items-center px-3 pr-md-4 py-1  border hint-group" style="border-radius: 6px; background-color: rgb(243,243,243);"
                                        :hint-group="'主題: '+tagObj.group" >
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
                                            <div style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none;"> 
                                            {{getTagName(tagObj)}}
                                            </div>
                                        </div>
                                        <div v-if="true"
                                             class="position-absolute right-0 cursor-pointer"
                                             style="top: 50%; transform: translate(-50%, -50%); "
                                             @click="removeTag(product, tagObj.tag.TagGroup, tagObj.tag)"
                                             >
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
                                                        <!-- more tag button-->
                                <div v-if="tagListByProduct(product).length > tagNum_row"
                                  class="flex-shrink-0 inline-block">
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
                                  </div>
                              </div>
                            <div class="collapse row m-0 mt-1"
                                 :id="`collapseTag${productIdx}`">
                                <div v-for="tagObj in JSON.parse(JSON.stringify(tagListByProduct(product))).slice(tagNum_row)"
                                     :key="tagObj"
                                     class="col-12 col-md-3 p-0 px-1 mb-1 mb-md-1"
                                     >
                                     <!-- const userBrand=ref(authStore.MainConfig.BRAND); -->
                                    <div
                                        class="w-100 d-flex align-items-center 
                                      position-relative"
                                         :class="true ? 'bg-white text-gray' : 'bg-white text-secondary'"
                                         style="cursor: default;">
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
                                        <div class="w-100 text-center d-inline-flex align-items-center px-3 pr-md-4 py-1 border hint-group" style="border-radius: 6px; background-color: rgb(243,243,243); "
                                        :hint-group="'主題: '+tagObj.group">
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
                                            <div style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none;"> 
                                              {{getTagName(tagObj)}}
                                            </div>

                                        </div>
                                        <div v-if="true"
                                             class="position-absolute right-0  cursor-pointer "
                                             style="top: 50%; transform: translate(-50%, -50%);"
                                             @click="removeTag(product, tagObj.tag.TagGroup, tagObj.tag)"
                                             >
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

                    <!-- delete -->
                    <div class="d-none d-md-flex col-auto text-right pr-2 pl-0 align-items-center">
                        <!-- preview tag button-->
                         <div class="flex-shrink-0 mr-1" style="display:inline-flex">
                
                        <button class="btn h4 mb-0 pl-2 bg-white border d-flex align-items-center justify-content-center rounded-pill rounded-md-circle"
                                type="button"
                                @click="preview(product)"
                                style="  box-shadow : rgba(0,0,0,0.15) 0 2px 8px; font-size:12px
                                "
                                v-tooltip="tooltipText"
                                :disabled="(product.Routes[0]&&Object.keys(product.Routes[0]).length === 0)"
                                >
                              <img src="@/img/inffits_f_black.png" alt="f" class="m-1" style="height: 10px; width:auto; vertical-align: middle; margin-right: 3px; "> 預覽
                        </button>
                        </div>
                        <!-- delete button -->
                        <label class="h3 text-danger d-inline-flex align-items-center cursor-pointer mb-0" 
                             >
                            
                            <input :disabled="(product.Routes[0]&&Object.keys(product.Routes[0]).length === 0)" type="checkbox" value="" class="sr-only peer" v-model="product.mktOnline" @change="updateMktOnline(product.mktOnline, product.id)">
                            <div class="toggle-switch relative h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                                  style=""
                                  :class="(product.Routes[0]&&Object.keys(product.Routes[0]).length === 0)? 'disabled' : ''"
                                  >
                            </div>
                      </label>
                         <!-- @click="setEditProduct(product, true, 'deleteModal')" -->
                            <!-- <svg xmlns="http://www.w3.org/2000/svg"
                                 width="0.9em"
                                 height="0.9em"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                            </svg> -->
                        <!-- <label class="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer">
                          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label> -->
                         

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
<!-- <transition name="fade"> -->
<div id="preview_box" style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 2147483647; background: rgba(0, 0, 0, 0.5); transform: none; display: none;">
  <div id="inffits_cblock" style='z-index:60;display:block;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;'>
      <div id="tryon"><iframe ref="myiframe" id="inffits_tryon_window" style=" width:100%; height:100%; visibility:visible; position:relative; border:none; outline:none;  z-index:14;border-radius:10px;box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;" :src="iframeSrc"></iframe></div>
      <div id="inf_close" @click="close_preview()" style="cursor: pointer;position:absolute;top: -5px;z-index: 10000009;right: -10px;padding: 5px;height: 25px;width: 25px;border-radius: 50%;box-shadow: rgb(54 62 81 / 15%) 0px 0.0625rem 0.125rem 0.0625rem;background: white; opacity:1">
        <img src="https://inffits.com/webDesign/HTML/img/cancel.png" style="position:absolute;top:0;bottom:0;right:0;left:0;width:10px;margin:auto;">
      </div>

    </div>
</div>
<!-- </transition> -->

<!-- batch modal -->
 <div class="modal fade"
         id="batchModal"
         tabindex="-1"
         role="dialog"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"
             role="document"
             style="max-width: 800px; max-height: 800px">
            <div class="modal-content batch">
                <div class="modal-header border-0">
                    <h4 class="modal-title font-bold">批次新增標籤</h4>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <!--  -->
                    <div class="batch-products col-md-6 d-flex flex-column">
                      <h5 class=" font-bold">選擇設定的商品頁面：</h5>

                      <div class="d-flex mb-3 align-items-center">
                        <input type="text" v-model="searchQuery" placeholder="搜尋商品..." class="form-control mr-1" style="border-radius: 270px">
                        <!-- buttons -->
                        <div class="d-flex justify-content-end align-items-end " style="flex-grow: 1;">
                          <!-- reset -->
                          <div>             
                            <button type="button" class="btn mr-1 border" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); " @click="batchProducts = batchProducts.filter(id => !filteredProducts.map(product => product.id).includes(id));">取消全選</button>
                          </div>
                          <!-- choose all -->
                          <div>
                            <button type="button" class="btn border" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" @click="batchProducts = [...batchProducts, ...filteredProducts.map(product => product.id)];">全選</button>
                          </div>
                        </div>
                      </div>
                      <div class="border d-flex flex-column" style="border-radius: 10px; flex-grow: 1;">
                        <div class="d-flex flex-column py-2 px-2.5" style="max-height: 300px;  overflow-y: scroll; -ms-overflow-style: none; scrollbar-width: none;">
                          <div v-for="(product,productIdx) in filteredProducts"  :key="productIdx"
                          class="m-2  d-flex align-items-center">
                            <input :id="'product-' + productIdx" v-model="batchProducts" type="checkbox" :value="product.id" class="mr-1" >
                            <label :for="'product-' + productIdx" class="cursor-pointer label-batch">
                              <div class="d-flex align-items-center">
                                <div class="profile-img m-0 mx-1" style="border-style:none;  box-shadow : rgba(0,0,0,0.15) 0 2px 8px; min-width: 35px;">
                                    <div class="img-circle-wrapper" style="border-radius: 10%;">
                                        <div class="img-circle img-fluid bg-gray-light"
                                             :class="product.Imgsrc ? '' : 'd-none'">
                                        </div>
                                        <img class="img-circle img-fluid"
                                             :class="product.Imgsrc ? '' : 'd-none'"
                                             :src="product.Imgsrc"
                                             alt="">
                                    </div>
                                </div>
                                <span>
                                  {{ product.ItemName }}
                                </span>
                            </div>
                              

                            </label>
                          </div>
                        </div>
                        
                      </div>
                      
                    </div>
                    <!--  -->
                    <div class="batch-tags col-md-6 d-flex flex-column mt-6 mt-md-0" >
                      
                      <h5 class=" font-bold">選擇對應的標籤：</h5>

                      <div class="d-flex mb-3 align-items-center">
                        <input type="text" v-model="searchTags" placeholder="搜尋標籤..." class="form-control mr-1" style="border-radius: 270px">
                        <!-- buttons -->
                        <div class="d-flex justify-content-end align-items-end " style="flex-grow: 1;">
                          <!-- reset -->
                          <div>             
                            <button type="button" class="btn mr-1 border" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); " @click="reset_batch_choosed_tags()">取消全選</button>
                          </div>
                          <!-- choose all -->
                          <div>
                            <button type="button" class="btn border" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" @click="()=>{filteredTagGroups.forEach(tagGroup => batch_choosed_tags.Tags[tagGroup.group]=tagGroup.tags)}">全選</button>
                          </div>
                        </div>
                      </div>

                      <div class=" border d-flex flex-column" style="border-radius: 10px; flex-grow: 1;">
                        <div class="d-flex flex-column" style="max-height: 300px;  overflow-y: scroll; -ms-overflow-style: none; scrollbar-width: none;">
                          <div v-for="tagGroup in filteredTagGroups"
                                        :key="tagGroup"
                                        class="d-flex flex-column m-2 mb-2">

                                        <div class="text-gray ml-2 mb-2">
                                            {{tagGroup.group}}
                                        </div>
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div v-for="tag in tagGroup.tags"
                                                    :key="tag"
                                                    class="col-4 p-0 px-1 mb-2">
                                                    <div class="w-100 cursor-pointer d-flex align-items-center border
                                        position-relative"
                                                        :class="hasTag(batch_choosed_tags, tagGroup.group, tag) ? 'bg-secondary text-white' : ' text-secondary'"
                                                        :style="hasTag(batch_choosed_tags, tagGroup.group, tag) ? '':'backgroundColor: rgb(243,243,243);'"
                                                        @click.stop="setBatchChoosedTags(batch_choosed_tags, tagGroup.group, tag)"
                                                        style="line-height: 1; border-radius: 6px;">
                                                        <div v-if="!hasTag(batch_choosed_tags, tagGroup.group, tag)"
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
                                                        <div class="w-100 text-center d-inline-flex align-items-center px-3 px-md-4 py-1 py-md-1" style="line-height: 1.5; ">

                                                            <div class="profile-img m-1 "
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

                                                            <div style="white-space: nowrap; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none;">{{tag.Name}}</div>
                                                        </div>
                                                        <div v-if="hasTag(batch_choosed_tags, tagGroup.group, tag)"
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
                        <!-- buttons -->
                        <div class="d-flex justify-content-end align-items-end px-2 " style="flex-grow: 1;">

                          <!-- 新增 -->
                          <div>
                           
                            
                            <button type="button"
                          :disabled="batchProducts.length==0||Object.keys(batch_choosed_tags.Tags).length==0"
                          
                          class="btn my-2 mr-1 border"
                           style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
                          @click="batchEdit('delete')">- 刪除</button>
                          
                          </div>

                          <!-- 刪除 -->
                          <div>             
                                <button type="button"
                              :disabled="batchProducts.length==0||Object.keys(batch_choosed_tags.Tags).length==0"
                              class="btn my-2 ml-1 border"
                              style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); "
                              @click="batchEdit('add')"
                              >+ 新增</button>
                          </div>                 

                        </div>

                      </div>
                    </div>
                  </div>
                    <!--  -->
                  <!-- <div class="row mt-4">
                    
                    <div class="add-or-delete col-md-12 custom-dropdown">
                      <select v-model="addOrDelete" >
                        <option value="add">Add</option>
                        <option value="delete">Delete</option>
                      </select>
                      <p>操作：{{ addOrDelete }}</p>
                    </div>
                  </div> -->
                  
                </div>
                <div class="modal-footer border-0">
                    <button type="button"
                            class="btn btn-primary"
                            data-dismiss="modal">關閉</button>
                   
                </div>
            </div>
        </div>
    </div>
    </SectionMain>
</LayoutAuthenticated>
</template>
<!-- 會報錯??? -->
<!-- #inffits_tryon_window {
  @import url('@/css/css-in/iframe_style.min.css') !important;

}   -->
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

.label-batch:hover{
  color: black ;
  font-weight: 800;
}
button{

}

html body .font-bold{
  font-weight: 600;
}

@media (max-width: 768px) {
  .w100-max768{
    width: 100%;
  }

}
@media (min-width: 768px) {
  .w100-max768{
    flex: 0 0 13.666667%;
    max-width: 13.666667%;
  }

}

@media (min-width: 768px) {
  .col-md-3{
    flex:0 0 50%;
    max-width: calc((100% - 28px) / 2);
  }

}

@media (min-width: 990px) {
  .col-md-3{
    flex:0 0 33%;
    max-width: calc((100% - 28px) / 3);
  }

}

@media (min-width: 1150px) {
  .col-md-3{
    flex:0 0 25%;
    max-width: calc((100% - 28px) / 4);
  }

}


.dropdown-toggle::after{
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0em; 
  vertical-align: middle;
  content: "";
  border-top: .3em solid;
  border-right: .3em solid transparent;
  border-bottom: 0;
  border-left: .3em solid transparent;
}
@media (min-width: 768px) {
.brand-route-choose{
  width: 25%;
}
}

@media (max-width: 768px) {
  .brand-route-choose{
    width: 100%;
  }

}

@media (min-width: 768px) and (max-width: 1050px) {
#brand-route-menu{
  left: -100px !important;
}
}

.dropdown-menu {
  transform: translate3d(0, 0, 0) !important;
  top: 100% !important;
  left: 0 !important;
  will-change: transform !important;
}

.peer + .toggle-switch::before {
  content: 'OFF';
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: rgb(52 52 52);
  font-weight: 800;
}
.peer:checked + .toggle-switch {
  background-color: rgb(52 52 52);
}
.peer:checked + .toggle-switch::before {
  content: 'ON';
  left: 3px;
  right: auto;
  color: #fff;
  font-size: 10px;

}
.peer + .toggle-switch::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}
.peer:checked + .toggle-switch::after {
  transform: translateX(20px);
}

.toggle-switch{
  background: white ;
  border: 1.8px solid rgb(52 52 52);
  width:3.1rem;
}
.peer:checked + .toggle-switch::after{
  background-color: white;
  left: 2px;
}
.peer +.toggle-switch::after{
  border: none;
  background: rgb(52 52 52);
  top:1px;
  left:1px;
}
/* 移除蓝色框 */
.peer:focus + .toggle-switch,
.peer:active + .toggle-switch {
    outline: none;
    box-shadow: none;
}

.hint-group{
  position: relative;
}

.hint-group::after {
  content: attr(hint-group);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #979797;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.hint-group:hover::after {
  opacity: 1;
}



.tooltip-disabled {
  position: relative;
}

.tooltip-disabled::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #525252;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip-disabled:hover::after {
  opacity: 1;
}

.disabled::before, .disabled::after, .disabled {
  color: rgb(228, 228, 228) !important;
  border-color: rgb(228, 228, 228) !important;
  cursor: default;

}
.disabled::after{
  background-color: rgb(228, 228, 228) !important;
}

.custom-dropdown select {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  appearance: none;
  cursor: pointer;
  padding-right: 35px
}

.custom-dropdown select:focus {
  outline: none;
  border-color: #666;
}

.modal-content.batch{
  max-height:600px;
  overflow-y: scroll; -ms-overflow-style: none; scrollbar-width: none; 
}

</style>

