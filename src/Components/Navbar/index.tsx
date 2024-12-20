"use client";

import Image from "next/image";
import Logo from "@/Assets/logo.svg";
import Lupa from "@/Assets/lupa.svg";
import Menu from "@/Assets/menu.svg";
import Delete from "@/Assets/deleteIcon.svg";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isLogged } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLogged() != null); // Mantém o estado de login atualizado

  const router = useRouter();
  const changeMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setLoggedIn(isLogged() != null); // Atualiza o estado de login
  }, [router]);

  const Logout = () => {
    localStorage.removeItem("id");
    window.location.reload();
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <ul
        className={`${isMenuOpen ? styles.isMenuOpentrue : styles.isMenuOpenfalse}`}
      >
        <div className={styles.logoMenu}>
          <Link href="/">
            <Image
              width={10}
              height={10}
              src={Logo}
              alt="logo pyfit"
              className={styles.logo}
            />
          </Link>
          <Image
            width={10}
            height={10}
            src={isMenuOpen ? Delete : Menu}
            alt="logo pyfit"
            onClick={changeMenuOpen}
            className={styles.menu}
          />
        </div>
        <li>
          <a href="/Unidades">Units</a>
        </li>
        <li>
          <Link href="/#plans">Plans</Link>
        </li>
        <li>
          <Link href={"Know"}>Know</Link>
        </li>
        <li className={styles.inputText}>
          <Image
            src={Lupa}
            width={20}
            height={20}
            alt="Lupa image"
            className={styles.lupaImage}
          />
          <input type="text" name="" id="" />
        </li>
        <li className={styles.alunArea}>
          <Link href={loggedIn ? "/Login" : "/Login"}>
            {loggedIn ? "Students" : "Student area"}
          </Link>
        </li>
        {loggedIn && (
          <li onClick={() => Logout()}>
            <p>Logout</p>
          </li>
        )}
        {loggedIn && (
          <li>
            <Link href={"/Prediction"}>Prediction</Link>
          </li>
        )}
      </ul>
    </header>
  );
}
