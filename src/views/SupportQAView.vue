<template>

    <LayoutAuthenticated>
<SectionMain>
    <SectionTitleLineWithButton :icon="mdiAccount" title="支援" main>
        &nbsp;
    </SectionTitleLineWithButton>
        <SupportQA
        v-for="(item, index) in QA"
        :key="index"
        :item="item"
      />
</SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SupportQA from '@/components/SupportQA.vue';
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import { mdiAccount } from '@mdi/js';
const QA=[
    {
        title:"商品管理",
        menu:[
            {
                title:"QQ1",
                ans:"AA1"
            },
            {
                title:"QQ2",
                ans:"AA2"
            },
            {
                title:"QQ3",
                ans:"AA3"
            }

        ]
        
    },
    {
        title:"About Q2",
        menu:[
            {
                title:"QQ1",
                ans:"AA1"
            },
            {
                title:"QQ2",
                ans:"AA2"
            },
            {
                title:"QQ3",
                ans:"AA3"
            }

        ]
        
    },
    {
        title:"About Q3",
        menu:[
            {
                title:"About QQ1",
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
                title:"QQ2",
                ans:"AA2"
            },
            {
                title:"QQ3",
                ans:"AA3"
            }

        ]
        
    }
]
</script>


