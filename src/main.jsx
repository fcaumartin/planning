import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './jsx/App';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);



/**
 * 
 * 
 * 
 * Affreux bricolage pour scroller le fond
 * 
 * 
 * 
 */


var clicked = false, clickX, clickY;

document.addEventListener('mousemove', function(e) {
    // console.log("move " + clicked)    
    clicked && updateScrollPos(e);
    });

document.addEventListener('mousedown',  function(e) {
    // console.log("down " + clicked)
        clicked = true;
        clickX = e.pageX;
        clickY = e.offsetY;
        document.querySelector("body").style.cursor = 'grab';
    });

document.addEventListener('mouseup',  function() {
        // console.log("up " + clicked)
        clicked = false;
        document.querySelector("body").style.cursor = 'auto';
    });

var updateScrollPos = function(e) {
    document.querySelector("body").style.cursor ='grab';
    // console.log(clickX, clickY, e.x, e.y)
    // window.scrollBy(clickX-e.x, clickY-e.y)
    window.scroll(window.scrollX + (clickX - e.pageX), window.scrollY + (clickY - e.pageY));
    // $("#formation_panel_root").scrollTop($("#formation_panel_root").scrollTop() + (clickY - e.offsetY));
}

// $(document).ready(function() {
//     let st = $(".now").offset();
//     le = $(window).width();
//     $(window).scrollLeft(st.left-(le/4));
//     $("#formation_panel_root").scrollTop($(".fond").height());
// });


