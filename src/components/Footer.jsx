import githubWhite from '../assets/github-white.svg'
import '../styles/Footer.css'


function Footer() {
  return (
    <footer>
        <a href='https://github.com/Stolir/' target="_blank" rel="noopener noreferrer">
        <img src={githubWhite} alt="github icon" />Stolir 2025
        </a>
    </footer>
  )
}

export default Footer;