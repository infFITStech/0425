<template>
<LayoutAuthenticated>
    <SectionMain>
        <SectionTitleLineWithButton :icon="mdiTagOutline" title="主題標籤管理" main>
            &nbsp;
        </SectionTitleLineWithButton>
    <div class="container pb-3">
        

        <div v-for="(group,groupIdx) in api.tagGroupList"
             :key="groupIdx"
             class="row mb-3">
            <h4 class="col-12 font-bold mb-2">
                <div class=" h5 pl-4 bg-white border d-flex align-items-center justify-content-center rounded-pill cursor-pointer tag-title " 
                style="max-width:max-content; box-shadow : rgba(0,0,0,0.15) 0 2px 8px; padding-top: 3px;padding-bottom: 3px;  font-weight: 600; "
                @click="updateThemeName(group.group)">
                    {{group.group}}
                    <BaseIcon :path="mdiPencilOutline" class="mx-2" />
                </div>
            </h4>
            <!-- ADD NEW -->
            <div class="col-lg-3 col-md-4 col-sm-12 col-12 mb-3">
                <div class="h-100 flex-grow-1 card shadow text-center bg-white border-0 rounded cursor-pointer"
                     @click="setEditTag({TagGroup: group.group})">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center">
                        <div>
                            <div class="profile-img w-100 border-4 mb-3">
                                <div class="img-circle-wrapper text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="40"
                                         height="40"
                                         fill="currentColor"
                                         class="bi bi-plus img-circle"
                                         viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </div>
                            </div>
                            <p class="h5 font-bold text-balck-50 mb-1" >新增</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- render tags -->
            <div v-for="(tag,tagIdx) in group.tags"
                 :key="tagIdx"
                 class="col-lg-3 col-md-4 col-sm-12 col-12 mb-3">
                <div class="h-100 card text-center border-0 rounded bg-white shadow">
                    <div class="card-header py-4">

                        <div class="profile-img mb-3">
                            <div class="img-circle-wrapper">
                                <div class="img-circle img-fluid bg-gray-light"
                                     :class="tag.Imgsrc ? '' : 'd-none'"></div>
                                <img class="img-circle img-fluid"
                                     :class="tag.Imgsrc ? '' : 'd-none'"
                                     :src="tag.Imgsrc? tag.Imgsrc : defaultImg"
                                     alt="">
                            </div>
                        </div>
                        <div class="h4 font-bold text-body mb-1">{{tag.Name}}</div>
                        <small class="text-break text-truncate" style="white-space: wrap;">{{tag.Description}}</small>


                        <div class="position-absolute top-0 right-0 dropdown p-3">
                            <div class="cursor-pointer"
                                 type="button"
                                 id="dropdownMenuButton"
                                 data-toggle="dropdown"
                                 aria-haspopup="true"
                                 aria-expanded="false">

                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="16"
                                     height="16"
                                     fill="currentColor"
                                     class="bi bi-three-dots-vertical"
                                     viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right"
                                 aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item"
                                   @click="setEditTag(tag, true, 'editModal', Key='edit')">Edit</a>
                                <a class="dropdown-item"
                                   @click="setEditTag(tag, true, 'deleteModal')">Delete</a>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-body">
                        標籤名稱
                    </div> -->
                    <!-- <div class="card-footer pb-4">
                <a href="#"
                data-index="${index}"
                    class="btn btn-primary rounded-pill px-4"
                    onclick="toggleModal('editSizeModal')">${[item.sizeRequired ? item.size : '無合適主題']}</a>
            </div> -->
                </div>
            </div>
        </div>

        <div class="row">
            <!-- ADD NEW -->
            <div class="col-12 mb-3">
                <div class="h-100 flex-grow-1 card shadow text-center bg-white border-0 rounded cursor-pointer"
                     @click="setEditTag()">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center">
                        <div class="d-flex align-items-center">
                            <div class="profile-img border-4 mr-2"
                                 style="width: 40px;">
                                <div class="img-circle-wrapper text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="40"
                                         height="40"
                                         fill="currentColor"
                                         class="bi bi-plus img-circle"
                                         viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </div>
                            </div>
                            <p class="h5 font-bold text-balck-50 mb-1">新增主題或標籤</p>
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
                    <h4 class="modal-title font-bold">確認刪除</h4>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>是否確認刪除此標籤？</h5>
                </div>
                <div class="modal-footer border-0">
                    <button type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal">取消操作</button>
                    <button type="button"
                            class="btn btn-primary"
                            @click="deleteTag()">刪除</button>
                </div>
            </div>
        </div>
    </div>

    <!-- editModal -->
    <div class="modal fade"
         id="editModal"
         tabindex="-1"
         role="dialog"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"
             role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h4 class="modal-title font-bold">{{editTag.Key=="edit" ? '編輯' : '新增'}}標籤</h4>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- form -->
                    <form id="form-edit"
                          class="d-flex align-items-start">
                        <label class="d-block w-25">
                            <label class="d-flex flex-column w-75 mx-auto cursor-pointer image-container">
                                <div class="img-circle-wrapper mb-2">
                                    <!-- v-if="editTag.Imgsrc" -->
                                    <img
                                         class="img-circle img-fluid"
                                         id="img-edit"
                                         :src="editTag.Imgsrc?editTag.Imgsrc:defaultImg"
                                         alt="">
                                    <!-- <div v-else
                                         class="img-circle img-fluid bg-gray-light">
                                    </div> -->
                                        <!-- 上傳照片 -->
                                        <svg viewBox="0 0 24 24" class="inline-block image-edit-icon" style="color: white;">
                                            <path fill="currentColor" :d="mdiImage" />
                                          </svg>
                                </div>
                                <input type="file"
                                       class="d-none"
                                       @change="uploadImg"
                                       accept="image/*">
                            </label>
                            <div class="w-100" style="text-align: center; font-size: 13px">上傳圖片</div>
                        </label>
                        
                        <div class="w-75 container-fluid">
                            <!-- 主題名稱 -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">主題名稱</label>
                                <input type="text"
                                       name="TagGroup"
                                       v-model="editTag.TagGroup"
                                       class="form-control">
                            </div>
                            <!-- 圖片網址 -->
                            <!-- <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">圖片網址</label>
                                <input type="text"
                                       name="Imgsrc"
                                       v-model="editTag.Imgsrc"
                                       class="form-control">
                            </div> -->
                            <!-- 名稱 -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">主題描述</label>
                                <input type="text"
                                       name="Name"
                                       v-model="ThemeDesciption"
                                       
                                       class="form-control">
                            </div> 
                            
                            <!-- 名稱 -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">標籤名稱</label>
                                <input type="text"
                                       name="Name"
                                       v-model="editTag.Name"
                                       class="form-control">
                            </div>
                            <!-- 描述 -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">標籤描述</label>
                                <input type="text"
                                       name="Description"
                                       v-model="editTag.Description"
                                       class="form-control">
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer flex-column align-items-end border-0">
                    <div id="hint-edit"
                         class="d-none text-right text-danger mb-1">請填寫完整資訊</div>
                    <div>
                        <button type="button"
                                class="btn btn-secondary mr-2"
                                data-dismiss="modal">取消編輯</button>
                        <button v-tooltip="tooltipText"
                                type="button"
                                class="btn btn-primary"
                                @click="saveTag()"
                                :disabled="!editTag.TagGroup || !editTag.Name || !editTag.Description">存檔</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- updateModal -->
    <div class="modal fade"
         id="updateModal"
         tabindex="-1"
         role="dialog"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"
             role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h4 class="modal-title font-bold">更新主題名稱</h4>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- form -->
                    <form id="form-edit"
                          class="d-flex align-items-start">
                      
                        <div class="w-75 container-fluid">
                            <!-- 主題名稱 -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">主題名稱</label>
                                <input type="text"
                                       name="TagGroup"
                                       v-model="editTag.TagGroup" disabled
                                       class="form-control">
                            </div>
                            
                            <!-- new theme name -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">新主題名稱</label>
                                <input type="text"
                                       name="Description"
                                       v-model="new_group_name" 
                                       class="form-control">
                            </div>

                            <!-- theme decription -->

                        </div>
                    </form>
                </div>
                <div class="modal-footer flex-column align-items-end border-0">
                    <div id="hint-edit"
                         class="d-none text-right text-danger mb-1">請填寫完整資訊</div>
                    <div>
                        <button type="button"
                                class="btn btn-secondary mr-2"
                                data-dismiss="modal">取消編輯</button>
                        <button type="button"
                                class="btn btn-primary"
                                @click="update_themeName(editTag.TagGroup)">存檔</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </SectionMain>
</LayoutAuthenticated>
</template>

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
import {  mdiTagOutline } from '@mdi/js';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { mdiPencilOutline, mdiImage } from '@mdi/js';
import BaseIcon from '@/components/BaseIcon.vue';
import { useAuthStore } from '@/stores/userStore';
import { useApiStore } from '@/stores/apiFuncs';
import { useMainStore } from '@/stores/main';
import { useToast } from "vue-toastification";
import { error } from 'jquery';

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
const api = useApiStore()
const authStore = useAuthStore();
const userBrand =ref(authStore.MainConfig.BRAND)
const editTag = ref({});
const new_group_name = ref('');
const ThemeDesciption = ref('');
const defaultImg='https://s3.ap-northeast-1.amazonaws.com/inffits.com/mkt/img/empty.jpg'
 // https://s3.ap-northeast-2.amazonaws.com/inffitsmanager.assets/tmp/tmp/115-300x400.jpg
const tooltipText="請填寫完整資訊"


const uploadImg=(event)=> {

const file = event.target.files[0]

if (!file) return

// (寬:高 = 3:4)

// 如果圖片比例不符合3:4，則不上傳

const img = new Image()

img.src = URL.createObjectURL(file)

img.onload = () => {

    if (img.width / img.height !== 3 / 4) {

        alert('圖片比例不符合3:4')

        return

    } else {

        axios.put(`https://x24sw7agoh.execute-api.ap-northeast-2.amazonaws.com/v2/inffitsmanager.assets/tmp/tmp/${file.name}`,

            file,

            {

                headers: {

                    'Content-Type': file.type

                }

            })

            .then(response => {

                const filepath = "https://s3.ap-northeast-2.amazonaws.com/inffitsmanager.assets/tmp/tmp/";

                const imgsrc = filepath + file.name;



                console.log(imgsrc)

                editTag.value.Imgsrc = imgsrc

            })

            .catch(error => {

                console.error(error);

                console.log('IMG UPLOAD FAIL');

            });

    }

}



};

// const previewImg=(event)=> {

// const file = event.target.files[0]

// const reader = new FileReader()



// };
const updateThemeName=(old_name)=>{
    setEditTag({TagGroup:old_name}, true, 'updateModal');
}

const update_themeName = async(old_name) =>{
    mainStore.setIsLoading(true);

    if (typeof AWS === 'undefined') {
    const region = 'ap-northeast-1';
    const identityPoolId = 'ap-northeast-1:ec9d0f5d-ae3e-4ff2-986f-2025ddbedf1a';

    const credentials = fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region }),
      identityPoolId,
    });

    const lambdaClient = new LambdaClient({ region, credentials });

    const brand = userBrand.value;
    const preTagGroup = old_name;
    const postTagGroup = new_group_name.value;

    const payload = JSON.stringify({
      Brand: brand,
      pre_taggroup: preTagGroup,
      post_taggroup: postTagGroup,
    });

    const params = {
      FunctionName: 'mkt_extensions_rename_proc',
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: payload,
    };

    try {
      const command = new InvokeCommand(params);
      const response = await lambdaClient.send(command);
      console.log(response);

      api.getTagGroupList()
      setEditTag({}, true, 'updateModal');
      new_group_name.value = '';
      mainStore.setIsLoading(false);

    } catch (error) {
      console.error(error);
    }
  }
  //////////////////

}




const setEditTag = (tag = { TagGroup: '', Tag: String(new Date().getTime()), Name: '', Imgsrc: '', Description: '' }, toToggleModal = true, toggleModalName = 'editModal', Key='') => {
  editTag.value = Object.assign({ TagGroup: '', Tag: String(new Date().getTime()), Name: '', Imgsrc: '', Description: '' }, JSON.parse(JSON.stringify(tag)));
  editTag.value.Key = Key
  if (toToggleModal) {
    toggleModal(toggleModalName);
  }
};

const toggleModal = (modalId) => {
    $(`#${modalId}`).modal('toggle') 
    
  }

const checkTag=(name, tagGroup)=>{
    //不能有同名標籤
    const allTags = api.tagGroupList.flatMap(group => group.tags);
    const targetTag = allTags.find(tag => tag.TagGroup === tagGroup && tag.Name === name);
    if(targetTag)
    {
        const toast = useToast();
        toast("新增標籤失敗，標籤名稱重複", setting);
        
        return false
    }
    return true

}

const saveTag=() =>{
    //不能有同名標籤
    
    if(!checkTag(editTag.value.Name, editTag.value.TagGroup))
    {
        return
    }

    if(!editTag.value.Imgsrc){
        editTag.value.Imgsrc = defaultImg
    }
            axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_tag', {
                Brand: userBrand.value,
                Data: editTag.value
            }).then(response => {
                console.log(response)
                api.getTagGroupList()
                setEditTag({}, true, 'editModal')
            })
        };



const deleteTag=async()=> {
    const deletedTagGroup = editTag.value.TagGroup
    const deletedTag=editTag.value.Tag
    
    await axios.delete(`https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/del_tag?Brand=`+userBrand.value+`&Tag=${editTag.value.Tag}`).then(async(response) => {
        console.log(response)
        await api.getTagGroupList()

        
        setEditTag({}, true, 'deleteModal')
    })
    
    if(!api.tagGroupList.some(item => item.group === deletedTagGroup)) //刪掉某tag後，此taggroup也不存在
    {
        updateRoutes(deletedTagGroup)
    }

    updateProducts(deletedTagGroup, deletedTag)


            
}


const updateProducts=(deletedTagGroup, deletedTag)=>{
    console.log("update products")
    
    api.productList.forEach(product => {
    // 檢查目標 TagGroup 是否存在
    if (product.Tags && product.Tags[deletedTagGroup]) {

        // 過濾掉要刪除的 Tag
        product.Tags[deletedTagGroup] = product.Tags[deletedTagGroup].filter(tag => tag.Tag !== deletedTag);

        // 如果 TagGroup 變為空陣列，可以刪除整個 TagGroup
        if (product.Tags[deletedTagGroup].length === 0) {
            delete product.Tags[deletedTagGroup];
        }

        api.saveProduct({
            Tags: product.Tags,
            id: product.id,
        });
    }
});
}

const updateRoutes=(deletedTagGroup)=>{
    console.log("group deleted")

        const filteredList = api.routeList.filter(item => item.TagGroups_order.includes(deletedTagGroup));
        const updatedList = filteredList.map(item => {
            item.TagGroups_order = item.TagGroups_order.filter(tag => tag !== deletedTagGroup);
            return item;
        });

        updatedList.forEach(updatedRoute => {
            const payload = {
            Brand: userBrand.value,
            Data: {
                Description: updatedRoute.Description,
                Imgsrc: updatedRoute.Imgsrc,
                Name: updatedRoute.Name,
                Route: updatedRoute.Route,
                TagGroups_order: updatedRoute.TagGroups_order
            }
            };

            

            axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_route', payload)
            .then(response => {
                console.log(response)
            })
            
        });

        api.getRouteList()
}




api.getTagGroupList();
api.getRouteList();
api.getProductList();
</script>


<style scoped>
@import url('@/css/css-in/bootstrap-variables.css');
@import url('@/css/css-in/bootstrap.min.css');
@import url('@/css/css-in/frame.css');
@import url('@/css/css-in/style.css');
@import url('@/css/css-in/style.min.css');



.image-edit-icon {
    position: absolute;
    top: 50%;      
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #fff;   
    opacity: 0;     
    transition: opacity 0.3s;
    pointer-events: none;  
    width: 48px;    
    height: 48px;
}

.image-container:hover .image-edit-icon {
    opacity: 0.8;     
}
.image-container:hover #img-edit{
    filter: brightness(70%);
}
.tag-title:hover {
    color: #9c9c9c;
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

</style>