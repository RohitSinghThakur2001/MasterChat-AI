async function saveAsPDF() {
  const element = document.getElementById('chat-box');
  const content = document.querySelectorAll("#chat-box i")
  content.forEach(elem => {
      elem.style.height = '20px'
  });

await html2pdf().from(element).save();//make it await 
  
  content.forEach(elem => {
      elem.style.height = ''
  });
}
