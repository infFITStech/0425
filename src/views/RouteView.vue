<template>
<LayoutAuthenticated>
<SectionMain>
    <SectionTitleLineWithButton :icon="mdiMulticast" title="動線管理" main>
        &nbsp;
    </SectionTitleLineWithButton>
    <div class="container pb-3">
        <!-- <div class="row mb-3">
            <h1 class="col-12">動線管理</h1>
        </div> -->

        <h3>設定提問動線</h3>
        <div v-for="(route,routeIdx) in routeList"
             :key="routeIdx"
             class="row mb-3">
            <!-- render tags -->
            <div class="col-12">
                <div class="h-100 flex-grow-1 bg-white rounded">
                    <div class="p-3">
                        <div class="d-flex justify-content-between">
                            <div class="h5 font-bold text-body mb-3">{{route.Name}}</div>

                            <div>
                    
                                <a class="d-inline-flex align-items-center cursor-pointer mr-4 edit-btn"
                                
                                   @click="setEditRoute(route, true, 'editModal', editRoute=true)">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="1em"
                                         height="1em"
                                         viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                              d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                                    </svg>
                                    編輯</a>

                                    <a class="text-danger d-inline-flex align-items-center cursor-pointer"
                                    @click="setEditRoute(route, true, 'deleteModal')">
                                     <svg xmlns="http://www.w3.org/2000/svg"
                                          width="1em"
                                          height="1em"
                                          viewBox="0 0 24 24">
                                         <path fill="currentColor"
                                               d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                                     </svg>
                                     刪除</a>
                            </div>

                        </div>

                        <small v-if="route.Description"
                               class="text-break text-truncate mb-3">{{route.Description}}</small>
                        <p class="mb-0">{{route.TagGroups_order.join(' - ')}}</p>
                        {{console.log(route,tagGroupList,  "routtttttttte")}}
                      
                    </div>
                    <!-- <div class="card-body">
                        動線名稱
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
                     @click="setEditRoute()">
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
                            <p class="h5 font-bold text-balck-50 mb-1">新增動線</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- editSizeModal -->
    <div class="modal fade"
         id="editSizeModal"
         tabindex="-1"
         role="dialog"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"
             role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">更新主題資訊</h5>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- form -->
                    <form id="form-edit-size">
                        <div class="form-group">
                            <label class="col-form-label">主題資訊</label>
                            <input type="text"
                                   name="size"
                                   id="input-edit-size"
                                   class="form-control"
                                   value="請輸入主題資訊">
                        </div>
                        <!-- 預設人員 -->
                        <div class="form-group form-check align-items-center mb-1">
                            <input class="form-check-input"
                                   type="checkbox"
                                   name="sizeRequired"
                                   id="checkbox-sizeRequired-1"
                                   onchange="toggleInputSize()">
                            <label class="form-check-label"
                                   for="checkbox-sizeRequired-1">無合適主題</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer flex-column align-items-end border-0">
                    <div id="hint-edit-size"
                         class="d-none text-right text-danger mb-1">請填寫完整資訊</div>
                    <div>
                        <button type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal">取消</button>
                        <button type="button"
                                class="btn btn-primary"
                                onclick="updateEditSize()">更新</button>
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
                    <h5>是否確認刪除此動線？</h5>
                </div>
                <div class="modal-footer border-0">
                    <button type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal">取消操作</button>
                    <button type="button"
                            class="btn btn-primary"
                            @click="deleteRoute()">刪除</button>
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
                    <h5 class="modal-title">{{editRoute.isEditRoute ? '編輯' : '新增'}}動線</h5>
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
                        <div class="container-fluid">
                            <div class="row mb-4">
                                <!-- 名稱 -->
                                <div class="col-12 d-flex align-items-center mb-2">
                                    <label class="flex-shrink-0 pr-2">名稱</label>
                                    <input type="text"
                                           name="Name"
                                           v-model="editRoute.Name"
                                           class="form-control">
                                </div>
                                <!-- 描述 -->
                                <div class="col-12 d-flex align-items-center mb-2">
                                    <label class="flex-shrink-0 pr-2">描述</label>
                                    <input type="text"
                                           name="Description"
                                           v-model="editRoute.Description"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- 請選擇要顯示的項目： -->
                            <div class="row mb-3">
                                <h4 class="col-12 font-bold">01 請選擇要顯示的項目：</h4>
                                <div class="col-12">
                                    <div v-for="tagGroup in tagGroupList"
                                         :key="tagGroup.group"
                                         class="rounded-pill cursor-pointer d-inline-flex align-items-center border
                                         position-relative
                                          mb-2 mr-2"
                                         :class="editRoute.TagGroups_order.includes(tagGroup.group) ? 'bg-secondary text-white' : 'bg-white text-secondary'"
                                         @click="setEditRouteTag(tagGroup.group)"
                                         style="line-height: 1;">
                                        <div v-if="!editRoute.TagGroups_order.includes(tagGroup.group)"
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
                                        <span class="d-inline-block px-4 py-2">
                                            {{tagGroup.group}}
                                        </span>
                                        <div v-if="editRoute.TagGroups_order.includes(tagGroup.group)"
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

                            <!-- 請選擇問題順序 -->
                            <div class="row bg-gray-light py-3 rounded">
                                <h4 class="col-12 font-bold">02 請選擇問題順序：</h4>
                                <div class="col-12">
                                    <draggable v-model="editRoute.editingTagGroups"
                                               :item-key="'group'"
                                               :component-data="{name:'fade'}">
                                        <template #item="{element, index}">
                                            <div class="mb-1 d-flex">
                                                <div class="bg-white px-2 py-1 mr-1">{{index+1}}</div>
                                                <div class="flex-grow-1 bg-white px-2 py-1">{{element.group}}</div>
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
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
                        <button :v-tooltip="tooltipText"
                                type="button"
                                class="btn btn-primary"
                                @click="saveRoute()"
                                :disabled="editRoute.editingTagGroups.length==0||editRoute.Description==''||editRoute.Name==''" >存檔</button>
                                
                    </div>
                </div>
            </div>
        </div>
    </div>
</SectionMain>

</LayoutAuthenticated>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import axios from 'axios';
import draggable from 'vuedraggable';
import { mdiMulticast } from '@mdi/js';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import { useAuthStore } from '@/stores/userStore';

const authStore = useAuthStore();


export default defineComponent({
  components: {
    draggable,
    LayoutAuthenticated,
    SectionMain,
    SectionTitleLineWithButton,
    

  },
  setup() {
    const userBrand=ref(authStore.MainConfig.BRAND);

    const state = reactive({
      rawList: [],
      tagGroupList: [],
      routeList: [],
      editRoute: {
        TagGroups_order: [],
        editingTagGroups: []
      }
    });

    const getTagGroupList = async() => {
        // Key: 主題名稱
        // Tag: 標籤ID, 
        // Name: 標籤名稱, 
        // Imgsrc: 圖片url, 
        // TagGroup:主題
        console.log(userBrand.value, "getTagGroupList");

      await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_tags?Brand='+userBrand.value+'&Per_Page=100&Page=1').then(response => {
        const tagGroupMap = {};
        response.data.models.forEach(tag => {
          if (!tagGroupMap[tag.TagGroup]) {
            tagGroupMap[tag.TagGroup] = [];
          }
          tagGroupMap[tag.TagGroup].push(tag);
        });
        // clear this.tagGroupList
        state.tagGroupList = [];
        for (const key in tagGroupMap) {
          state.tagGroupList.push({
            group: key,
            tags: tagGroupMap[key]
          });
        }
      });
    };

    const getRouteList = () => {
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
      axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_routes?Brand='+userBrand.value+'&Per_Page=100&Page=1').then(response => {
        state.rawList = response.data.models;
        state.routeList = [...response.data.models];
      });
    };

    const setEditRouteTag = (group) => {
            if (!state.editRoute.TagGroups_order.includes(group)) {
                state.editRoute.TagGroups_order.push(group)
                state.editRoute.editingTagGroups.push({ group: group })
            } else {
                state.editRoute.TagGroups_order = state.editRoute.TagGroups_order.filter(item => item !== group)
                state.editRoute.editingTagGroups = state.editRoute.editingTagGroups.filter(item => item.group !== group)
            }
        };

        
    const updateTagGroups=(route)=>
    {
        // const validGroups =  state.tagGroupList.map(groupObj => groupObj.group);
        
        // const filteredTaglist =  route.TagGroups_order.filter(tag => validGroups.includes(tag));
        // console.log(validGroups, filteredTaglist, "aaaaaaaaaaaaaaaaaaaaaaaa")


        // const payload = {
        //         Brand: 'INFS',
        //         Data: {
        //             Description: route.Description,
        //             Imgsrc: route.Imgsrc,
        //             Name: route.Name,
        //             Route: route.Route,
        //             TagGroups_order: filteredTaglist
        //         }
        //     }
        //     axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_route', payload).then(response => {
        //         console.log(response)
        //         getRouteList()
        //         setEditRoute({}, false, 'editModal')
        //     })
        

        // return filteredTaglist
       

    }

    const setEditRoute= (route = {
            Description: '',
            Imgsrc: '',
            Name: '',
            Route: String(new Date().getTime()),
            TagGroups_order: [],
            editingTagGroups: []
        },
            toToggleModal = true,
            toggleModalName = 'editModal', isEditRoute=false) => {

            state.editRoute = Object.assign({
                Description: '',
                Imgsrc: '',
                Name: '',
                Route: String(new Date().getTime()),
                TagGroups_order: [],
                editingTagGroups: [],
                isEditRoute: false
            },
                JSON.parse(JSON.stringify(route)),
                {
                    editingTagGroups: route.TagGroups_order ? route.TagGroups_order.map(group => {
                        return { group: group }
                    })
                        : []
                })
            state.editRoute.isEditRoute = isEditRoute

            console.log(state.editRoute)
            if (toToggleModal) {
                toggleModal(toggleModalName)
            }
        };
        const toggleModal=(modalId)=> {
            $(`#${modalId}`).modal('toggle');
        };

        const saveRoute=()=> {
            const payload = {
                Brand: userBrand.value,
                Data: {
                    Description: state.editRoute.Description,
                    Imgsrc: state.editRoute.Imgsrc,
                    Name: state.editRoute.Name,
                    Route: state.editRoute.Route,
                    TagGroups_order: state.editRoute.editingTagGroups.map(({ group }) => group)
                }
            }
            axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_route', payload).then(response => {
                console.log(response)
                getRouteList()
                setEditRoute({}, true, 'editModal')
            })
        };

        const deleteRoute=()=> {
            axios.delete(`https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/del_route?Brand=`+userBrand.value+`&Route=${state.editRoute.Route}`).then(response => {
                console.log(response)
                getRouteList()
                setEditRoute({}, true, 'deleteModal')
            })
        }
    const tooltipText="請填寫完整資訊"

    
      
    onMounted(async() => {
        getTagGroupList();
    getRouteList();
      
    });

   

    return {
      ...toRefs(state),
      getTagGroupList,
      getRouteList,
      setEditRouteTag,
      setEditRoute,
      toggleModal,
      saveRoute,
      deleteRoute,
      mdiMulticast,
      tooltipText,
      updateTagGroups
    };
  }
});
</script>

<style scoped>
@import url('@/css/css-in/bootstrap-variables.css');
@import url('@/css/css-in/bootstrap.min.css');
@import url('@/css/css-in/frame.css');
@import url('@/css/css-in/style.css');
@import url('@/css/css-in/style.min.css');

.edit-btn:hover{
    color: #3a3a3a !important;
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