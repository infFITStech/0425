<template>
<LayoutAuthenticated>
    <SectionMain>
        <SectionTitleLineWithButton :icon="mdiAccount" title="主題標籤管理" main>
            &nbsp;
        </SectionTitleLineWithButton>
    <div class="container pb-3">
        

        <div v-for="(group,groupIdx) in tagGroupList"
             :key="groupIdx"
             class="row mb-3">
            <h4 class="col-12 font-bold mb-2">
                {{group.group}}
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
                            <p class="h5 font-bold text-balck-50 mb-1">ADD NEW</p>
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
                                     :src="tag.Imgsrc"
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
                                   @click="setEditTag(tag, true, 'editModal')">Edit</a>
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
                            <p class="h5 font-bold text-balck-50 mb-1">ADD NEW THEME</p>
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
                    <h5 class="modal-title">{{editTag.Key ? '編輯' : '新增'}}標籤</h5>
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
                            <label class="d-flex flex-column w-75 mx-auto cursor-pointer">
                                <div class="img-circle-wrapper mb-2">
                                    <img v-if="editTag.Imgsrc"
                                         class="img-circle img-fluid"
                                         id="img-edit"
                                         :src="editTag.Imgsrc"
                                         alt="">
                                    <div v-else
                                         class="img-circle img-fluid bg-gray-light"></div>
                                </div>
                                <input type="file"
                                       class="d-none"
                                       @change="uploadImg"
                                       accept="image/*">
                            </label>
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
                                <label class="pr-2 flex-shrink-0">名稱</label>
                                <input type="text"
                                       name="Name"
                                       v-model="editTag.Name"
                                       class="form-control">
                            </div>
                            <!-- 描述 -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="pr-2 flex-shrink-0">描述</label>
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
                        <button type="button"
                                class="btn btn-primary"
                                @click="saveTag()">存檔</button>
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
import { mdiAccount } from '@mdi/js';
const rawList = ref([]);
const tagGroupList = ref([]);
const editTag = ref({});

 // https://s3.ap-northeast-2.amazonaws.com/inffitsmanager.assets/tmp/tmp/115-300x400.jpg

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
const getTagGroupList=()=> {
            // Key: 主題名稱
            // Tag: 標籤ID, 
            // Name: 標籤名稱, 
            // Imgsrc: 圖片url, 
            // TagGroup:主題
            axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_tags?Brand=INFS&Per_Page=100&Page=1').then(response => {
                const tagGroupMap = {}
                rawList.value = response.data.models
                response.data.models.forEach(tag => {
                    if (!tagGroupMap[tag.TagGroup]) {
                        tagGroupMap[tag.TagGroup] = []
                    }
                    tagGroupMap[tag.TagGroup].push(tag)
                })

                // clear this.tagGroupList
                tagGroupList.value = []
                for (const key in tagGroupMap) {
                    tagGroupList.value.push({
                        group: key,
                        tags: tagGroupMap[key]
                    })
                }
            })
        };

const setEditTag = (tag = { TagGroup: '', Tag: String(new Date().getTime()), Name: '', Imgsrc: '', Description: '' }, toToggleModal = true, toggleModalName = 'editModal') => {
  editTag.value = Object.assign({ TagGroup: '', Tag: String(new Date().getTime()), Name: '', Imgsrc: '', Description: '' }, JSON.parse(JSON.stringify(tag)));
  if (toToggleModal) {
    toggleModal(toggleModalName);
  }
};

const toggleModal = (modalId) => {
    $(`#${modalId}`).modal('toggle') 
    
  }

const saveTag=() =>{
            axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_tag', {
                Brand: 'INFS',
                Data: editTag.value
            }).then(response => {
                console.log(response)
                getTagGroupList()
                setEditTag({}, true, 'editModal')
            })
        };


const deleteTag=()=> {
            axios.delete(`https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/del_tag?Brand=INFS&Tag=${editTag.value.Tag}`).then(response => {
                console.log(response)
                getTagGroupList()
                setEditTag({}, true, 'deleteModal')
            })
        }

onMounted(() => {
  getTagGroupList();
});
</script>


<style scoped>
@import url('@/css/css-in/bootstrap-variables.css');
@import url('@/css/css-in/bootstrap.min.css');
@import url('@/css/css-in/frame.css');
@import url('@/css/css-in/style.css');
@import url('@/css/css-in/style.min.css');

</style>