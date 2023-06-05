const languageSelect = document.getElementById("language-select")
const experienceBtn = document.querySelectorAll(".experience-button")

getTexts("pt")

experienceBtn.forEach(b=>{
    b.addEventListener('click', (event)=>{
        experienceBtn.forEach(bt=>{
            if(event.target.id!=bt.id){
                bt.classList.remove('selected-button')
            }
            else{
                bt.classList.add('selected-button')
            }})
        document.querySelectorAll('.experience-div').forEach(e=>{
            let bsTarget=event.target.dataset.bsTarget
            if(e.id!=bsTarget.substring(1,bsTarget.length)){
                e.classList.remove('show')
                e.classList.add('collapse')
            }
        })
    })
})

languageSelect.addEventListener('change',(event)=>{
    this.getTexts(event.target.value)
    const experienceDiv = document.querySelectorAll('.experience-div')
    experienceBtn.forEach((bt,index)=>{
        if(index==0){
            bt.classList.add('selected-button')
            experienceDiv[index].classList.add('show')
            experienceDiv[index].classList.remove('collapse')
        }
        else {
            bt.classList.remove('selected-button')
            experienceDiv[index].classList.remove('show')
            experienceDiv[index].classList.add('collapse')
        }
    })
})

function getTexts(language){
    fetch(`${language}.json`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("main-description").innerText = data.mainDescription;
      document.getElementById("location_on").innerText = data.locationOn;
      languageSelect.setAttribute('aria-label', data.languageAriaLabel);
      document.getElementById("summary").innerText = data.summary;
      document.getElementById("summary-text").innerText = data.summaryText;
      document.getElementById("experience").innerText = data.experience;
      document.getElementById("experience-container").innerHTML = setExperienceHtml(data.experiences);
      document.getElementById("other-experiences").innerText = data.otherExperiences.title;
      document.getElementById("academic-background").innerText = data.academicBackGround.title;
      document.getElementById("academic-background-list").innerHTML = setList(data.otherExperiences.list);
      document.getElementById("other-experiences-list").innerHTML = setList(data.academicBackGround.list);
      document.getElementById("languages").innerText = data.languagesSkills.title;
      document.getElementById("languages-list").innerHTML = setLanguageList(data.languagesSkills.list);
      document.getElementById("courses").innerText = data.courses.title;
      document.getElementById("courses-list").innerHTML = setList(data.courses.list);
      document.getElementById("footer-text").innerText = data.footerText;
    });
}

function setExperienceHtml(experience){
    experiencesList = Object.entries(experience)
    htmlText = ''
    experiencesList.forEach((e, index)=>{
        let insideHtmlText = ''
        e[1].forEach(e1=>{
            insideHtmlText+= `
                <div>
                    <h3 class="experience-position">${e1.position}</h3>
                    <p class="experience-period">${e1.period}</p>

                    <p class="mb-0">Principais atribuições:</p>
                    <ul>
                        ${setList(e1.responsabilities)}
                    </ul>
                </div>
            `
        })

        htmlText += `
            <div class="experience-div card card-body ${index>0?'collapse': ''}" id="experience${index}" >
                ${insideHtmlText}
            </div>
        `
    })

    return htmlText
}

function setList(list){
    return list.map(li=>{return `<li>${li}</li>`}).join('')
}

function setLanguageList(list){
    return list.map(li=>{return `
        <div class="language-list-option">
            <p class="mb-0 language-list-name">${li.name}</p>
            <div class="language-bar" aria-disabled=true>
                <div class="language-bar-selected" style="width: ${100/3*li.level}%;"></div>
            </div>
            <p class="text-end language-list-level">${li.levelName}</p>
        </div>
    `}).join('')
}