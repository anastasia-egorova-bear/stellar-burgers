import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  isConstructor = false,
  isFeed = false,
  isProfile = false
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link
          to='/'
          className={`${styles.link} ${isConstructor ? styles.link_active : ''}`}
        >
          <BurgerIcon type={isConstructor ? 'secondary' : 'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <Link
          to='/feed'
          className={`${styles.link} ${isFeed ? styles.link_active : ''}`}
        >
          <ListIcon type={isFeed ? 'secondary' : 'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Link to='/'>
          <Logo className='' />
        </Link>
      </div>
      <div
        className={`${styles.link_position_last} ${styles.link} ${isProfile ? styles.link_active : ''}`}
      >
        <Link to='/profile' className={styles.link}>
          <ProfileIcon type={isProfile ? 'secondary' : 'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);
