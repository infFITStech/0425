<template>

    <LayoutAuthenticated>
<SectionMain>
    <SectionTitleLineWithButton :icon="mdiHelpCircleOutline" title="支援" main>
        &nbsp;
    </SectionTitleLineWithButton>
    <div style="padding-left: 15px; padding-right: 15px;">
        <SupportQA
        v-for="(item, index) in QA"
        :key="index"
        :item="item"
      />
    </div>
</SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SupportQA from '@/components/SupportQA.vue';
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import {  mdiHelpCircleOutline } from '@mdi/js';
const QA=[
    {
        title:"商品管理",
        menu:[
            {
                title:"如何設定動線",
                ans:"AA1"
            },
            {
                title:"新增商品標籤",
                ans:"AA2"
            }
            // {
            //     title:"QQ3",
            //     ans:"AA3"
            // }

        ]
        
    },
    {
        title:"購物動線規劃",
        menu:[
            {
                title:"新增主題至動線",
                ans:"AA1"
            },
            {
                title:"調整動線主題順序",
                ans:"AA2"
            }
            // {
            //     title:"QQ3",
            //     ans:"AA3"
            // }

        ]
        
    },
    {
        title:"主題及標籤",
        menu:[
            {
                title:"新增主題內的標籤及相關內容",
                menu:[
                    {
                        title:"QQQ1",
                        ans:"AA1"
                    },
                    {
                        title:"QQQ2",
                        ans:"AA2"
                    },
                    {
                        title:"QQQ3",
                        ans:"AA3"
                    }

                ]
            },
            {
                title:"調整主題名稱及描述",
                ans:"AA2"
            }


        ]
        
    }
]
</script>


<style>

</style>