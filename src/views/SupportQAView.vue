<template>
    <LayoutAuthenticated>

        <SupportQA
        v-for="(item, index) in QA"
        :key="index"
        :item="item"
      />
    </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SupportQA from '@/components/SupportQA.vue';

const QA=[
    {
        title:"About Q1",
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


<style scoped>

</style>