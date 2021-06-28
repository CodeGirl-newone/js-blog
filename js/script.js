'use strict';

function titleClickHandler(event){
  event.preventDefault();  //Adres strony nie powinien się już zmieniać przy klikaniu w linki w lewej kolumnie
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }   

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', {clickedElement}, 'aktywny');
  
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', {targetArticle}, 'aktywny');
}


 
//modul 5.4 Generowanie listy tytulow
 
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  

function generateTitleLinks(customSelector = ''){
/* remove contents of titleList */
  const titleList =  document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log({customSelector});
  let html = '';  
  for (let article of articles){
  /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('Id artykułu to: ' + articleId);

    /* find the title element */
  
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);
  
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();


// moduł 6. Generowanie listy tagów
function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    console.log({wrapperTags});
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log({articleTagsArray});
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTMLtag = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li> ';
      console.log(linkHTMLtag);
      /* add generated code to html variable */
      html = html + linkHTMLtag;
      /* END LOOP: for each tag */
      console.log(html);
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML = html;    
  }
}
generateTags();


//moduł 6. Dodajemy akcję po kliknięciu w tag
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault(); 
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag został kliknięty');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href + ' został kliknięty');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag + ' odfiltrowany');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    console.log('Usunięta klasa activ');
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref){
    /* add class active */
    tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    console.log(tagLinkHref);
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
/* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  console.log(links);
  /* START LOOP: for each link */
  for(let link of links){
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();



// moduł 6. Dodajemy autorów
const optArticleAuthorSelector = '.post-author';

//Generowanie listy autorów
function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* LOOP: for every article find author wrapper */
  for (let article of articles){
    const wrapperAuthors = article.querySelector(optArticleAuthorSelector);
    console.log({wrapperAuthors});
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors);
    /* for each author generate HTML of the link */
    const linkHTMLAuthor = '<a href="#author-'+ articleAuthors +'">'+ articleAuthors +'</a>';
    console.log({linkHTMLAuthor});
    /* add generated code to html variable */
    html = linkHTMLAuthor;
    console.log(html);
    /* insert HTML of all the links into the tags wrapper */
    wrapperAuthors.innerHTML = html;
  }
}
generateAuthors();

  
function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault(); 
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag został kliknięty');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href + ' został kliknięty');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author + ' odfiltrowany');
  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);
  /* START LOOP: for each active author link remove class active */
  for (let authorLink of authorLinks){
    authorLink.classList.remove('active');
    console.log('Usunięta klasa activ');
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link add class active */
  for (let authorLinkHref of authorLinksHref){
    authorLinkHref.classList.add('active');
    console.log(authorLinkHref);
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


//Powiązanie kliknięcia z autorem
function addClickListenersToAuthors(){
  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log({links});
  /* LOOP: for each link add authorClickHandler as event listener for that link */
  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();





// moduł 6. Wyświetlenie listy tagów
const optTagsListSelector = '.tags.list';

function CalculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };
  console.log(params);
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  console.log(tags);
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article find tags wrapper */
  for (let article of articles){
    const wrapperTag = article.querySelector(optArticleTagsSelector);
    console.log({wrapperTag});
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log({articleTagsArray});
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li>';
      

      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      } 
      /* END LOOP: for each tag */
      console.log(linkHTML);
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapperTag.innerHTML = html;
    /* END LOOP: for every article: */
    console.log(html);
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList 
  //tagList.innerHTML = allTags.join(' ');     Poprzednia wersja kodu*/
  
  const tagsParams = CalculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  //[NEW] create variable for all links HTML code     Nowa wersja kodu
  let allTagsHTML = '';


  //[NEW] start loop: for each tag in allTags
  for(let tag in allTags){
    //[NEW] generate code of a link and add it to allTagsHTML
    //allTagsHTML += tag + ' (' + allTags[tag] + ') ';     generuje tylko tag i liczbę, bez linka
    //allTagsHTML += '<li><a href="#tag-'+ tag +'">'+ tag +'</a>(' + allTags[tag] + ')</li>';
    //allTagsHTML += '<li><a href="#tag-'+ tag +'" class="'calculateTagClass'">'+ tag +'</a>(' + allTags[tag] + ')</li>';
    
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag +  '</a></li> ';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  
  //[NEW] end loop for each tag in allTags
  
  //[NEW] add HTML from allTagsHTML to tagList
  tagList.innerHTML = allTagsHTML;
}
generateTags();