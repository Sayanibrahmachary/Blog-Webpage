import react from 'react';
import './HeroSection.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope,faPhoneVolume,} from '@fortawesome/free-solid-svg-icons';
import {faSquareInstagram} from '@fortawesome/free-brands-svg-icons';

function HeroSection()
{
    return (<>
            <div className="whole">
                <div className="heroSectionWhole">
                    <div className="heroSection">
                        <div className="leftSideHero">
                            <div className="image1"><img src="./src/assets/Banarash.jpg"/></div>
                            <div className="text">
                                <br/>
                                <h3>#Banarash</h3><br/>
                                <p>Banaras breathes in chants and incense, where time drapes itself in saffron hues.
                                    <br/>
                                    Each sunrise paints the Ganga gold, whispering secrets of a thousand lifetimes.</p>
                            </div>
                        </div>
                        <div className="gap">
                            <h1>L</h1>
                            <br/>
                            <h1>O</h1>
                            <br/>
                            <h1>S</h1>
                            <br/>
                            <h1>T</h1>
                            {/* <br/> */}
                            <br/>
                            <br/>
                            <br/>
                            <h1>I</h1>
                            {/* <br/> */}
                            <h1>N</h1>
                            {/* <br/> */}
                            <br/>
                            <br/>
                            <br/>
                            <h1>W</h1>
                            {/* <br/> */}
                            <h1>Ø</h1>
                        </div>
                        <div className="rightSideHero">
                            <div className="upperSideHero">
                                <div className="image2">
                                    <img src="./src/assets/download (1).jpg"/>
                                </div>
                                <div className="text1">
                                    <br/>
                                    <h3>#Sukoon</h3><br/>
                                    <p>Climb the mountains, where silence speaks in echoes and the sky leans close to kiss your soul.</p>
                                </div>
                            </div>
                            .
                            <div className="bottomSideHero">
                                <div className="image3">
                                    <img src="./src/assets/download (2).jpg"/>
                                </div>
                                <div className="text2">
                                    <br/>
                                    <h3>#Travelling</h3><br/>
                                    <p>Wandering through Paris, where every corner whispers romance and every street feels like a scene from a dream.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutSection">
                    <div className="leftAboutSection">
                        <img src="./src/assets/AboutUsPicture.jpg"/>
                    </div>
                    <div className="rightAboutSection">
                        <h2>About Us</h2>
                        <p>Blogging websites are online platforms that allow individuals to publish written content, often in the form of articles or journal entries. These platforms, such as WordPress, Blogger, and Medium, provide user-friendly tools for writing, formatting, and designing posts. Many of them offer customizable themes and layouts, enabling bloggers to create a unique look for their site without needing coding skills. Users can include images, videos, and links to enhance their content and engage readers.
                        Blogging websites also support features like comments and social sharing, which help build a community around the blog. Search engine optimization (SEO) tools are often integrated, making it easier for content to reach a wider audience. Many bloggers use these platforms to share personal experiences, professional insights, or niche interests. Additionally, blogging can be a source of income through ads, affiliate marketing, or sponsored posts. Whether used for personal expression or business promotion, blogging websites make content creation accessible and impactful.</p>
                    </div>
                </div>
                <div className="contact-us">
                    <h2>Want to Know More ?</h2>
                    <div className="upperPart-contactUs">
                        <div className="contactUs-image">
                            <img src="./src/assets/contact-us.jpg"/>
                        </div>
                        <div className="upperLayer">
                            <h3>C  &nbsp; &nbsp;O &nbsp; &nbsp; N&nbsp; &nbsp;  T&nbsp; &nbsp;  A &nbsp; &nbsp; C&nbsp; &nbsp;  T  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; U &nbsp; &nbsp; S</h3>
                        </div>
                    </div>
                    <div className="bottomPart-contactUs">
                        <div className="writting-Part">
                            <div className="writting-Part-1st-line">
                                <p>Have questions, suggestions, or just want to say hello?</p>
                            </div>
                            <div className="writting-Part-2nd-line">
                                <p>Use the form below or email us directly, and we’ll get back to you soon!</p>
                            </div>    
                            <div className="writting-Part-3rd-line">
                                <p>We'd love to hear from you—drop us a message anytime.</p>
                            </div>
                        </div>
                        <div className="last-Part">
                            <div className="email">
                                <FontAwesomeIcon className="i" icon={faEnvelope} style={{color: "rgb(176, 17, 233)",fontSize: '30px'}} />
                                <h2>email-address</h2>
                                <p>sayanibrahmachary084@gmail.com</p>
                            </div>
                            <div className="phone">
                                <FontAwesomeIcon className="i" icon={faPhoneVolume} style={{color: 'rgb(176, 17, 233)', fontSize: '25px'}}/>
                                <h2>phone</h2>
                                <p>9832146683</p>
                            </div>
                            <div className="insta">
                                <FontAwesomeIcon className="i"  icon={faSquareInstagram} style={{color: 'rgb(176, 17, 233)', fontSize: '40px'}}/>
                                <h2>Instagram</h2>
                                <p>Sayani Brahmachary</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection;