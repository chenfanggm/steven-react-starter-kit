import './AboutPage.scss'
import React from 'react'
import Showdown from 'showdown'


const converter = new Showdown.Converter()

const whoAmI =
  `My name is Chen Fang, a **Full-Stack Software Engineer**.
  I'm an **passionate adventurer** finding the truth of the meaningful life.
  I'm an **unfulfilled educator** telling his bumpy story to the youth who
  are looking for an answer to their life that they shouldn't be answered by
  themselves by suffering through all the unnecessary pains.`

const whatAboutTheSite =
  `This site is about sharing my continuously growing **awareness of being**
  alive. It also shares some **technologies** that I learned from any honorable
  resources to help new developers catch up a little bit easier. I wish to
  learn new things from your friendly and honest comments and emails. Thank you!`

class AboutView extends React.Component {
  render() {
    return (
      <article className='about-page-container'>
        <main>
          <section className='page-section'>
            <h3 className='section-title'>Me</h3>
            <p className='section-main'
               dangerouslySetInnerHTML={{ __html: converter.makeHtml(whoAmI) }}>
            </p>
          </section>
          <section className='page-section'>
            <h3 className='section-title'>The Site</h3>
            <p className='section-main'
               dangerouslySetInnerHTML={{ __html: converter.makeHtml(whatAboutTheSite) }}>
            </p>
          </section>
        </main>
      </article>
    )
  }
}

export default AboutView
