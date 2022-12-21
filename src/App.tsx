import EclipseLogo from './assets/eclipse.jpg';


export const App = () => {

  return (
    <div className="App">
      <header>
        <nav className='h-[50px] w-full absolute top-0 z-[1] bg-[rgba(0,0,0,0.3)] md:bg-transparent'>
          <ul className='flex justify-around md:justify-start gap-[2rem] items-center h-full custom-breakpoint-container'>
            <li><a href='https://www.linkedin.com/in/zachary-pimentel' className='text-white hover:text-pink transition-[0.3s]' target='_blank'>My LinkedIn</a></li>
            <li><a href='mailto:zachary@eclipsereality.com' className='text-white hover:text-pink transition-[0.3s]' target='_blank'>Email Me</a></li>
          </ul>
        </nav>
        <div className='overflow-hidden relative h-[500px] bg-purple flex items-center justify-center'>
          <div id='eclipse-banner'></div>
          <div className='relative'>
            <h1 className='font-bebasneue text-[5rem] text-white lg:text-[8.4rem] text-center '>Zachary Pimentel</h1>
            <div className='flex flex-col items-center'>
              <p className='text-center text-white text-[2rem] lg:text-[4.8rem] flex items-center flex-wrap gap-[20px]'>Eclipse Reality's</p>
              <div className='relative'>
                <p id='css-wizard' className='font-bebasneue text-pink text-[4.8rem] inline-block leading-[5rem] relative'>CSS Wizard</p>
                <span id='css-wizard-arrow'
                className='
                  absolute top-[10%] left-[25%] rotate-[-20deg] 
                  w-[300px] text-white text-[1.1rem] lg:text-[1.3rem] border border-white h-[100px] rounded-[100px] flex items-end px-[30px]
                  border-transparent border-l-white
                '>
                    Their phrase, but I'm <br></br>gonna own it.
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className='relative overflow-hidden'>
          <div className='absolute black-to-white-gradient w-[300vh] h-[300vh] rotate-[45deg] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[0]'></div>
          <div className='relative'>
            <h2 className='font-bebasneue text-[5.4rem] lg:text-[6rem] text-white custom-breakpoint-container bg-pink md:bg-transparent text-center md:text-left py-[3.6rem]'>Who is this guy?</h2>
          </div>
        </div>
        <div className='custom-breakpoint-container py-[3.6rem]'>
          <p className='text-[2rem] lg:max-w-[50%]'>A software engineer, father, husband, and life-long learner. I love all things related to web development, but especially the front end; from development to design. If you have a picture, I can make you a website out of it.</p>
        </div>
      </section>

      <section className='bg-purple'>
        <div className='flex items-end py-[3.6rem] gap-[10px] justify-center'>
          <h2 className='text-white font-bebasneue text-[5.4rem] leading-[4rem]'>My goal</h2>
          <p className='text-white font-bold'>(and my job)</p>
        </div>
        <div className='custom-breakpoint-container pb-[3.6rem]'>
          <p className='text-white text-[2rem] text-center max-w-[1100px] mx-auto'>is to provide quality services to solve any website problems or goals you might have with prompt delivery, transparent communication, and unyielding professionalism. I take pride in making dreams your 
            <span className='text-pink text-[2rem] text-bold'> reality</span>.
          </p>
        </div>
      </section>

      <footer className='bg-black'>
        <div className='custom-breakpoint-container text-white flex gap-[5rem] py-[3.2rem]'>
          <h3 className='font-bebasneue text-[5rem] leading-[5rem]'>Company <br></br> Links</h3>
          <ul className='flex gap-[2rem] items-center flex-wrap'>
            <li><a className='hover:underline' target='_blank' href='https://www.facebook.com/eclipserealityagency'>Facebook</a></li>
            <li><a className='hover:underline' target='_blank' href='https://twitter.com/_eclipsereality'>Twitter</a></li>
            <li><a className='hover:underline' target='_blank' href='https://www.instagram.com/eclipserealityagency/'>Instagram</a></li>
            <li><a className='hover:underline' target='_blank' href='https://www.linkedin.com/company/eclipse-reality/'>LinkedIn</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}