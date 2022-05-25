import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Issue.css';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import logo from '../../assests/images/Icon.png';
import { useTranslation } from 'react-i18next';
import Language from '../Translate/Language';

const Issue = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [summary, setSummary] = useState('');
  const [type, setType] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [assignee, setAssignee] = useState('');
  const [tags, setTags] = useState('');
  const [sprint, setSprint] = useState('');
  const [story, setStory] = useState('');

  const headers: any = {
    userID: localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : '1'
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      summary,
      type,
      projectID: project,
      description,
      priority,
      status: 1,
      assignee,
      tags: [tags],
      sprint,
      storyPoint: story
    };
    axios
      .post('https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue', formData, {
        headers: headers
      })
      .then((res: any) => {
        localStorage.setItem('issueId', res.data['issueId']);
        navigate('/dashboard');
      })
      .catch((error: any) => {
        if (summary.trim().length < 5) {
          alert('Summary must be at least 5 characters');
        } else if (type.trim().length <= 0) {
          alert('Type cannot be empty');
        } else if (project.trim().length <= 0) {
          alert('Project cannot be empty');
        } else if (description.trim().length <= 0) {
          alert('Description cannot be empty');
        } else if (priority.trim().length <= 0) {
          alert('Priority cannot be empty');
        } else if (assignee.trim().length <= 0) {
          alert('Assignee cannot be empty');
        } else if (tags.trim().length <= 0) {
          alert('Tags cannot be empty');
        } else if (sprint.trim().length <= 0) {
          alert('Sprint cannot be empty');
        } else if (story.trim().length <= 0) {
          alert('Story must be between 1-13');
        }
      });
  };
  const handleReset = (e: any) => {
    e.preventDefault();
    setSummary('');
    setType('');
    setProject('');
    setDescription('');
    setPriority('');
    setAssignee('');
    setTags('');
    setSprint('');
    setStory('');
  };

  useEffect(() => {
    async function getRes() {
      const response = await axios.get(
        'https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user',
        { headers: headers }
      );
      setAllUser(response.data);
    }
    getRes();
  }, []);

  useEffect(() => {
    async function getRes() {
      const response = await axios.get(
        'https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project',
        { headers: headers }
      );
      setAllProjects(response.data);
    }
    getRes();
  }, []);

  return (
    <>
      <div className="issue-container">
        <div className="issue_sidebar">
          <img src={logo} className="issue_sideImg" alt="" />
          <div className="issue_link-div">
            <Link to="/dashboard">{t('PROJECT BOARD')}</Link>
            <Link to="/create_issue" className="issue_active">
              <p className="issue_link">{t('CREATE ISSUES')}</p>
            </Link>
            <Link to="#">{t('CREATE PROJECTS')}</Link>
          </div>
          <Language flag={false} />
        </div>
        <div>
          <NavBar flag={false} />
          <div className="issue_content">
            <h1 className="issue_h1">{t('Create User Stories/Tasks/Bugs')}</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <div className="issue_input-container">
                <label htmlFor="Summary">{t('Summary')}</label>
                <input
                  type="text"
                  placeholder={t('Add Summary')}
                  className="issue_summary"
                  name="Summary"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                />
              </div>
              <div className="issue_select-input">
                <div className="issue_input-container">
                  <label htmlFor="issue_select">{t('Type')}</label>
                  <select
                    className="issue_select"
                    name="Type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}>
                    <option disabled selected hidden value="">
                      {t('Select')}
                    </option>
                    <option value="1">BUG</option>
                    <option value="2">TASK</option>
                    <option value="3">STORY</option>
                  </select>
                </div>
                <div className="issue_input-container">
                  <label htmlFor="Project">{t('Project')}</label>
                  <select
                    className="issue_select"
                    name="Project"
                    value={project}
                    onChange={(event) => setProject(event.target.value)}>
                    <option selected disabled hidden value="" style={{ display: 'none' }}>
                      {t('Select')}
                    </option>
                    {allProjects.map((project) => (
                      <option key={project['projectID']} value={project['projectID']}>
                        {project['projectID']}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="issue_input-container">
                <label htmlFor="">{t('Description')}</label>
                <textarea
                  cols={10}
                  rows={4}
                  name="Description"
                  className="issue_description"
                  placeholder={t('Write description')}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="issue_select-input">
                <div className="issue_input-container">
                  <label htmlFor="Priority">{t('Priority')}</label>
                  <select
                    className="issue_select"
                    name="Priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}>
                    <option selected disabled hidden value="">
                      {t('Select')}
                    </option>
                    <option value="1">LOW</option>
                    <option value="2">MEDIUM</option>
                    <option value="3">HIGH</option>
                  </select>
                </div>

                <div className="issue_input-container">
                  <label htmlFor="Asignee">{t('Asignee')}</label>
                  <select
                    className="issue_select"
                    name="Asignee"
                    value={assignee}
                    onChange={(event) => setAssignee(event.target.value)}>
                    <option selected disabled hidden value="">
                      {t('Select')}
                    </option>
                    {allUser.map((user) => (
                      <option key={user['id']} value={user['id']}>
                        {user['name']}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="issue_select-input">
                <div className="issue_input-container">
                  <label htmlFor="Tags">{t('Tags')}</label>
                  <select
                    className="issue_select"
                    name="Tags"
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}>
                    <option selected disabled hidden value="">
                      {t('Select')}
                    </option>
                    <option>Angular</option>
                    <option>Django</option>
                    <option>MongoDB</option>
                    <option>NodeJS</option>
                  </select>
                </div>

                <div className="issue_input-container">
                  <label htmlFor="">{t('Sprint')}</label>
                  <select
                    className="issue_select"
                    name="Sprint"
                    value={sprint}
                    onChange={(event) => setSprint(event.target.value)}>
                    <option selected disabled hidden value="">
                      {t('Select')}
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </div>
              <div className="issue_input-container">
                <label htmlFor="">{t('Story Points')}</label>
                <input
                  type="number"
                  name="Story"
                  min="1"
                  max="12"
                  className="issue_story"
                  placeholder="1,2,3..."
                  value={story}
                  onChange={(event) => setStory(event.target.value)}
                />
              </div>
              <div className="issue_button">
                <button type="reset" className="issue_reset">
                  {t('RESET')}
                </button>
                <button type="submit" className="issue_create">
                  {t('CREATE')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Issue;
