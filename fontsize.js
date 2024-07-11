function increaseSize(){
        const content = document.getElementById('chat-box');
        const currentFontSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
        const newSize = parseInt(currentFontSize) + 2 + 'px'; // Increase font size by 2px
        content.style.fontSize = newSize;

        const icons = document.querySelectorAll("#chat-box i")
        icons.forEach(elem => {
        const content = elem;
        const currentFontSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
        const newSize = parseInt(currentFontSize) + 2 + 'px'; // Increase font size by 2px
        content.style.fontSize = newSize;
        });
    
}
function dicreaseSize(){
        const content = document.getElementById('chat-box');
        const currentFontSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
        const newSize = parseInt(currentFontSize) - 2 + 'px'; // Increase font size by 2px
        content.style.fontSize = newSize;
    

        const icons = document.querySelectorAll("#chat-box i")
        icons.forEach(elem => {
        const content = elem;
        const currentFontSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
        const newSize = parseInt(currentFontSize) - 2 + 'px'; // Increase font size by 2px
        content.style.fontSize = newSize;
        });
       
}
