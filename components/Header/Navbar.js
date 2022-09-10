import Link from "next/link";
import classes from "./Navbar.module.css"
import Router from 'next/router';
const Navbar = ()=> {
    return (
        <nav>
          <ul className={classes["nav-list"]}>
              <li className={classes["nav-items"]}><Link href="/"><i className="fa-solid fa-terminal"></i></Link></li>
              <li className={classes["nav-items"]}><Link href="/">Home</Link></li>
              <li className={classes["nav-items"]}><Link href="/questions" replace>Questions</Link></li>
              {/*<li className={classes["nav-items"]} onClick={() => Router.push('/questions')}>Questions</li>*/}
          </ul>
      </nav>
    )
}

export default Navbar