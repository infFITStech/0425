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
        title:"官網及商品管理",
        menu:[
            {
                title:"如何設定動線：",
                ans:"其中分為”官網”及”商品”的動線設定，打開下拉式選單，其中包含了您設定好的所有動線，點選完成後，即可於右側 ”預覽”，體驗該商品的動線流程"
            },
            {
                title:"新增商品標籤：",
                ans:"點開標籤選單，即可針對您的商品進行標籤，幫助顧客找最適合的商品"
            }
            // {
            //     title:"QQ3",
            //     ans:"AA3"
            // }

        ]
        
    },
    {
        title:"動線規劃",
        menu:[
            {
                title:"新增主題：",
                ans:"若主題及標籤頁面已經設定相關主題，即可將多個主題連成一個動線，提供給顧客進行快速選購"
            },
            {
                title:"調整主題順序：",
                ans:"主題也可以透過“拖曳”，完成順序的調整"
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
                title:"新增主題內之標籤：",
                // menu:[
                //     {
                //         title:"QQQ1",
                //         ans:"AA1"
                //     },
                //     {
                //         title:"QQQ2",
                //         ans:"AA2"
                //     },
                //     {
                //         title:"QQQ3",
                //         ans:"AA3"
                //     }

                // ]
                ans:"您可以在主題及標籤頁面，設定各式各樣的主題，並對官網上的商品進行標籤，讓顧客更方便購物，根據您想要新增的標籤，請點擊 ”新增主題或標籤” 開始設定吧！"
            },
            // {
            //     title:"調整主題名稱及描述",
            //     ans:"AA2"
            // }


        ]
        
    }
]
</script>


<style>

</style>