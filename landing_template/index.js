// initialization

const RESPONSIVE_WIDTH = 1024

let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")
const headerEl = document.querySelector("header")
let headerHeight = headerEl?.offsetHeight || 64


function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("max-lg:!tw-opacity-100", "tw-min-h-[90vh]", "mobile-open")
        collapseHeaderItems.style.height = `calc(100vh - ${headerHeight}px)`
        collapseHeaderItems.style.top = `${headerHeight}px`
        collapseHeaderItems.style.opacity = "1"
        collapseHeaderItems.style.pointerEvents = "auto"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x")
        isHeaderCollapsed = false

        document.body.classList.add("modal-open")
        document.documentElement.classList.add("mobile-menu-open")

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("max-lg:!tw-opacity-100", "tw-min-h-[90vh]")
        collapseHeaderItems.style.height = "0vh"
        collapseHeaderItems.classList.remove("mobile-open")
        collapseHeaderItems.style.top = ""
        collapseHeaderItems.style.opacity = ""
        collapseHeaderItems.style.pointerEvents = ""
        collapseBtn.classList.remove("bi-x")  
        collapseBtn.classList.add("bi-list")
        document.body.classList.remove("modal-open")
        document.documentElement.classList.remove("mobile-menu-open")

        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    headerHeight = headerEl?.offsetHeight || 64
    if (!isHeaderCollapsed){
        toggleHeader()
    }

    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.height = ""

    } else {
        isHeaderCollapsed = true
    }
}
responsive()
window.addEventListener("resize", responsive)

/** Dark and light theme */
if (localStorage.getItem('color-mode') === 'dark' || (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('tw-dark')
    updateToggleModeBtn()
} else {
    document.documentElement.classList.remove('tw-dark')
    updateToggleModeBtn()
}

function toggleMode(){
    //toggle between dark and light mode
    document.documentElement.classList.toggle("tw-dark")
    updateToggleModeBtn()
    
}

function updateToggleModeBtn(){

    const toggleIcon = document.querySelector("#toggle-mode-icon")
    
    if (document.documentElement.classList.contains("tw-dark")){
        // dark mode
        toggleIcon.classList.remove("bi-sun")
        toggleIcon.classList.add("bi-moon")
        localStorage.setItem("color-mode", "dark")
        
    }else{
        toggleIcon.classList.add("bi-sun")
        toggleIcon.classList.remove("bi-moon")
        localStorage.setItem("color-mode", "light")
    }

}




const videoBg = document.querySelector("#video-container-bg")
const videoContainer = document.querySelector("#video-container")

function closeVideo(){
    videoContainer.classList.add("tw-scale-0")
    videoContainer.classList.remove("tw-scale-100")

    setTimeout(() => {
        videoBg.classList.remove("tw-scale-100", "tw-opacity-100")
        videoBg.classList.add("tw-scale-0", "tw-opacity-0")
    }, 400)
   

    document.body.classList.remove("modal-open")

}

/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})

gsap.fromTo("#dashboard",
    {
        scale: 0.8,
        translateY: 12,
        rotateX: "70deg",
        transformPerspective: 1200
    },
    {
        scale: 1,
        translateY: 0,
        rotateX: "0deg",
        scrollTrigger: {
            trigger: "#hero-section",
            start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
            end: "bottom bottom",
            scrub: 1,
        }
    }
)

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        // Toggle 'rotate' class to rotate the arrow
        let content = this.nextElementSibling
        let icon = this.querySelector(".bi-plus")

        // content.classList.toggle('!tw-hidden')
        if (content.style.maxHeight === '240px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'
            icon.style.transform = "rotate(0deg)"
            
        } else {
            content.style.maxHeight = '240px'
            content.style.padding = '20px 18px'
            icon.style.transform = "rotate(45deg)"
        }
    })
})



// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", // top of trigger hits the top of viewport
                                                            end: "20% 90%",
                                                            // markers: true,
                                                            // scrub: 1,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
        delay: (i, target) => target.dataset.revealDelay ? parseFloat(target.dataset.revealDelay) : 0
    })


})
