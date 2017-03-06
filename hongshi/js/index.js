 (function(win, doc) {

   var img;
   var timer = [];
   var block = false;
   var slide = 1;
   var slides = 2;
   var dirs = ['up', 'right', 'down', 'left'];

   function byId(id) {
     return doc.getElementById(id);
   }

   function qAll(sel) {
     return doc.querySelectorAll(sel);
   }

   function each(arr, callback) {
     [].forEach.call(arr, callback);
   }

   function image(n) {
     var url = 'img/min_';
     url += n;
     url += '.png';
     return url;
   }

   function imageUrl(n) {
     var url = 'url(';
     url += image(n);
     url += ')';
     return url;
   }

   function preloadImages(images) {
     var div = doc.createElement('div');
     var bg = '';
     for (var i = 1; i <= images; i++) {
       bg += imageUrl(i);
       bg = i < images ? bg + ',' : bg;
     }
     div.style.backgroundImage = bg;
     div.style.opacity = '0';
     div.style.position = 'absolute';
     div.style.height = '0';
     div.style.width = '0';
     div.style.top = '0';
     div.style.left = '0';
     document.body.appendChild(div);
   }

   function overlay() {
     img = doc.createElement('div');
     img.style.backgroundImage = imageUrl(slide);
     img.classList.add('overlay');
     byId('wall').appendChild(img);
   }

   function updateSlides(elm, add) {
     var current = slide + add;
     current = current < 1 ? slides : current;
     current = current > slides ? 1 : current;
     each(elm.querySelectorAll('.front'), function(el, i) {
       el.style.backgroundImage = imageUrl(current);
     });
     each(elm.querySelectorAll('.bottom, .right, .top, .left'), function(el, i) {
       var nextSlide = current > slides - 1 ? 1 : current + 1;
       if (add > 0) {
         nextSlide = current < 2 ? slides : current - 1;
       }
       el.style.backgroundImage = imageUrl(nextSlide);
     });
   }

   function setSides(n) {
     img.style.opacity = '0';
     each(qAll('.cube'), function(el, i) {
       updateSlides(el, n);
       var rand = parseInt((Math.random() * 4), 10);
       var dir = dirs[rand];
       el.classList.add('sliding');
       el.classList.add(dir);
     });
   }

   function stop() {
     each(timer, function(el, i) {
       clearTimeout(timer[i]);
     });
   }
   
   function next(n) {
     if (block) {
       return false;
     }
     block = true;
     
     if (n < 0) {
       slide = slide > slides - 1 ? 0 : slide;
       slide++;
     } else if (n > 0) {
       slide = slide < 2 ? slides + 1 : slide;
       slide--;
     }
     setSides(n);
   }

   each(qAll('.cube'), function(el, i) {
     el.addEventListener('animationend', function() {
       el.className = 'cube';
       img.style.backgroundImage = imageUrl(slide);
       updateSlides(el, 0);
       if (i == qAll('.cube').length - 1) {
         block = false;
         img.style.opacity = '1';
       }
     });
   });


   byId('next').addEventListener('click', function() {
     stop();
     next(-1);
     checktxt();
   });

   byId('prev').addEventListener('click', function() {
      stop();
      next(1);
      checktxt();
   });

function checktxt(){
	var sss=$('.overlay').css('background-image');
	
	var reg=/min_2.png/
	if(sss.search(reg)!=-1){
		$('.txt-bg p').css('opacity','0').html('广州某金属有限公司成立于2011年，主要经营：铝板、铝带（大韩铝业，台湾中钢铝，美铝，西南铝业，明泰铝业等）电解镀锌、镁板、不锈钢、钛合金等金属材料，广泛用于电子、家电、办公设备、汽车等产品。融资企业为核心供应商，合作期限长，合作关系稳定，为了扩大进一步与通达的合作，经综合评审向企业提供保理融资，使得企业的产量得到更一步的扩大。').animate({
			opacity:1
		},2000)
	}else{
		$('.txt-bg p').css('opacity','0').html('某化工材料有限公司成立于2003年，主要从事五金制品表面处理的研究与应用，包含铝合金前处理脱脂剂、化学抛光剂、除膜剂、退膜剂、阳极染料、封孔剂；铜及其铜合金化学抛光剂、防变色处理；塑胶涂料、塑胶UV涂料、真空电镀UV涂料、金属UV涂料等。公司在铝合金表面处理方面有先进的技术团队，并具备多年阳极处理工程开发、生产管理经验。 融资企业为核心企业供应商，为核心企业提供化工材料，贸易稳定，获得红石保理提供保理融资支持。').animate({
			opacity:1
		},2000)
		
	}
}
   function delaySlide(n, int) {
     timer[n] = setTimeout(function() {
       next(-1);
     }, int * (n + 1));
   }

// function play(n, int) {
//   for (var i = 0; i < n; i++) {
//     delaySlide(i, int);
//   }
// }

   preloadImages(slides);
   overlay();
// play(slides, 3000);

 })(window, document);