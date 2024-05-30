import { useAuthStore } from "@/stores/userStore";
import axios from 'axios';
import { ref } from 'vue'
import { defineStore } from 'pinia'

const authStore = useAuthStore();
const userBrand=ref(authStore.MainConfig.BRAND)

export const useApiStore = defineStore('api', () => {
    const productList = ref([]);
    const rawList = ref([]);
    const brandList = ref([]);
    const routeList = ref([]);
    const tagGroupList = ref([]);


    async function saveProduct(updateData) {
        const payload = {
          Brand: userBrand.value,
          ...updateData,
        };
        const response = await axios.post('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_product', payload);
        console.log(response,"saveproduct!!!!!!!!!!!!!1");
        getProductList();
      };

      const getProductList = async () => {
        const response = await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_products?Brand='+userBrand.value+'&Per_Page=100&Page=1');
        rawList.value = response.data.models;
        productList.value = [...response.data.models];
        //getBrandList
        brandList.value=[]
        productList.value = await productList.value.filter(product => {
          if (product.ClothID.endsWith("_All")) {
              brandList.value.push(product);
              return false;
          }
          // 返回 true 表示保留在原列表中
          return true;
      });
      console.log("bye",productList.value)
      
      
      
      };

      const getRouteList = async () => {
                // {
              
        const response = await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_routes?Brand='+userBrand.value+'&Per_Page=100&Page=1');
        routeList.value = [...response.data.models];
        };

    
        const getTagGroupList = async () => {
             
          const response = await axios.get('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_tags?Brand='+userBrand.value+'&Per_Page=100&Page=1');
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
          console.log("hiiiiiiiiii",tagGroupList.value);
        };

    return {
        saveProduct,
        getProductList,
        brandList,
        rawList,
        productList,
        routeList,
        getRouteList,
        getTagGroupList,
        tagGroupList

      }
    });
    


