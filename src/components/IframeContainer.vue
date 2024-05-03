<template>
        <!--  Initial Loading  -->
        <div class="loadingbar" id="loadingbar">
            <div class="spinner spinner-circle"></div>
        </div>
    
    
        <div class='container back' id='containerback'></div>
        <!-- container -->
        <div class='container mbinfo animX' id="container-x">
            <div class="c_header" id="container-x-header">
                <span></span>
                <p></p>
            </div>
            <div class="selection_scroll">
                <div class="selection">
                    <div class="axd_selection">
                        <img class="axd_img c-x" id="container-x-0" data-item=0>
                    </div>
                    <div class="axd_selection">
                        <img class="axd_img c-x" id="container-x-1" data-item=1>
                    </div>
                    <div class="axd_selection">
                        <img class="axd_img c-x" id="container-x-2" data-item=2>
                    </div>
                </div>
            </div>
            <div class="footer">
                <img class="type_backarrow" id="container-x-backarrow" src="@/img/left-arrow.png" width="100%"
                    height="100%">
                <a class='c-x'>略過</a>
            </div>
        </div>
        <!-- background -->
        <div id='pback'></div>
</template>


<script setup>
import $ from 'jquery';

$(function () {
    $('#loadingbar').hide();
    $('#pback').show();
    $("#containerback").show();
    $('#container-x').show();
    $('#container-x-header').find('span').text('主題提問');
    $('#container-x-header').find('p').text('主題描述');
    $('#container-x-0').attr('src', '@/img/example34.jpg');
    $('#container-x-1').attr('src', '@/img/example34.jpg');
    $('#container-x-2').attr('src', '@/img/example34.jpg');
});
</script>

<style>
@import url('@/css/css-in/iframe_style.min.css');
</style>