import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Img from '../../../assests/images/emptyProject.png';
import classes from './NoProject.module.css';

const NoProject = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className={classes['text-home']}>
        <h1>{t('Welcome to Tracker')}</h1>
      </div>
      <p className={classes.paragraph}>
        {t("Seems like you haven'nt created any project yet.")}
        <Link to="/create_project" className={classes.link}>
          <p> {t('Click here')} </p>
        </Link>
        {t('to onboard a new project.')}
      </p>
      <img src={Img} alt="" className={classes.img} />
    </React.Fragment>
  );
};
export default NoProject;
