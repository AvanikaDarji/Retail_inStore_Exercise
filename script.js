 (function() {
     const getData = () => {
         fetch("./navigation.json")
             .then((response) => {
                 return response.json();
             })
             .then((data) => {
                 appendData(data);
             })
             .catch((err) => {
                 console.log(err);
             });
     };
     const appendData = (data) => {
         const navigationContainer = document.querySelector(".navigation");
         const cities = data.cities;
         let citiesList = cities
             .map((city, index) =>
                 index == 0 ?
                 `
      <a class="active" href= "#${city.section}" >${city.label}</a>
      ` :
                 `
      <a href= "#${city.section}" >${city.label}</a>
      `
             )
             .join(" ");

         navigationContainer.innerHTML = citiesList;
     };
     getData();
     setTimeout(function() {
         let activeLink = document.querySelector("a.active");
         let navigationLinks = document.querySelectorAll(".navigation  a");
         let mainContainer = document.querySelector(".main-container");
         let slide = document.querySelector(".active-link");
         navigationLinks.forEach((link) => {
             link.addEventListener("click", slideToLink);
         });

         function slideToLink(e) {
             setActiveSlide(activeLink);
             removeActiveClass();
             setActiveSlide(e.target);
         }
         const removeActiveClass = () => {
             activeLink.classList.remove("active");
         };

         const setActiveSlide = (target) => {
             let width = target.offsetWidth - 20;
             let left = getLeftValue(target);
             slide.style.left = `${left}px`;
             slide.style.width = `${width}px`;
         };
         const getLeftValue = (targetLink) => {
             let targetLeft = targetLink.getBoundingClientRect().left;
             let topNavigationLeft = mainContainer.getBoundingClientRect().left;
             return targetLeft - topNavigationLeft + 20;
         };
     }, 100);
 })();