/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import m, { Vnode } from 'mithril';
import '../scss/main.scss';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import '../scss/sidebar.scss';

import { Score } from './models/Score';

import {User} from './models/User';
let user = new User('ok', 0);
let score = new Score('ok', 0, 0);
let nameFieldValue = '';
let idFieldValue = 0;
let scoreFieldValue = 0;
let message = '';


const Everything = {
    setName: function(value: string) {
        nameFieldValue = value;
    },
    sendName: function(value: string) {
        let test: User = new User('ok', 0, nameFieldValue);
        user = test.postUser();
    },    
    setID: function(value: number){
        idFieldValue = value;
    },
    sendGetID: function(value: number) {
        user = new User('ok', idFieldValue);
        user.getUser();
        if (user.status == 'failure') {
            user.name = '[No such user]';
            message = 'No user with id' + user.id.toString();
        }
    },
    sendDeleteID: function(value: number) {
        let test: User = new User('ok', idFieldValue);
        test.deleteUser(idFieldValue);
        if (test.status == 'succes') {
            message = 'User deleted.'
        }
        else{
            message = 'Could not find user'
        }
    },
    setScore:function(value: number) {
        scoreFieldValue = value;
    },
    uploadScore:function(value: number) {
        let fieldsScore: Score = new Score('ok',idFieldValue, scoreFieldValue);
        let apiScore: Score = fieldsScore.postScore();
        score = apiScore;
        
    },
    sendGetScore:function(value: number) {
        score = new Score('ok', idFieldValue);
        score.getScore();
        if (score.status == 'failure') {
            score.score = 0;
        }
    },    
    sendDeleteScore:function(value: number) {
        let test: Score = new Score('ok', idFieldValue);
        test.deleteScore(idFieldValue);
        if (test.status == 'succes') {
            message = 'Score deleted.'
        }
        else{
            message = 'Could not find score for user'
        }
    },
    view: function() {
        return m('div', { class: 'main-window'},
        [
            m('nav', { class: 'sidebar' }, 
                [
                    m('div#sidebar-collapse-title', { class: 'sidebar-header' },
                        [
                            m('h3', 'Scores and Users' ),
                            m('strong', 'Max')
                        ]
                    ),
                    m('ul', { class: 'list-unstyled components' },
                        m('li', { class: 'list-unstyled components'}, [
                            m('div#user-field-header',
                            [
                                m('h8', 'Enter a player name')
                            ]),
                            m('input#new-user-field', {
                                oninput: m.withAttr('value', this.setName),
                                class: 'input field-info',}, [
                                m('i', { class: 'fas fa-algin-left'}, ''),
                                m('span', 'Field')
                            ]),
                            m('button#make-new-user', {
                                onclick: m.withAttr('value', this.sendName),
                                 class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'Upload User')
                            ]), m('div#user-field-header',
                            [
                                m('h8', '============')
                            ]),
                            m('div#user-field-header',
                            [
                                m('h8', 'Enter a user ID')
                            ]),
                            m('input#user-id-field', {
                                oninput: m.withAttr('value', this.setID),
                                class: 'input field-info', }, [
                                m('i', {class: 'fas fa-algin-left'}, ''),
                                m('span', 'Field')
                            ]),
                            m('button#get-user', {
                                onclick: m.withAttr('value', this.sendGetID),
                                 class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'Get User by ID')
                            ]),
                            m('button#delete-user', {
                                onclick: m.withAttr('value', this.sendDeleteID),
                                 class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'Delete user by ID')
                            ]), m('div#user-field-header',
                            [
                                m('h8', '============')
                            ]),
                            m('div#user-field-header',
                            [
                                m('h8', 'Now enter a score')
                            ]),
                            m('input#score-field', {
                                oninput: m.withAttr('value', this.setScore),
                                class: 'input field-info', }, [
                                m('i', {class: 'fas fa-algin-left'}, ''),
                                m('span', 'Field')
                            ]),
                            m('button#get-score', {
                                onclick: m.withAttr('value', this.uploadScore),
                                 class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'Upload Score')
                            ]),
                            m('button#get-score', {
                                onclick: m.withAttr('value', this.sendGetScore),
                                 class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'Get score by user ID')
                            ]),
                            m('button#delete-score', {
                                onclick: m.withAttr('value', this.sendDeleteScore),
                                 class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'Delete score by user ID')
                            ]), m('div#user-field-header',
                            [
                                m('h8', '============')
                            ]),
                            m('div#user-id-header',
                            [
                                m('h8', 'ID:')
                            ]),
                            m('div#user-id',
                            [
                                m('h8', user.id)
                            ]),
                            m('div#user-name-header',
                            [
                                m('h8', 'Name:')
                            ]),
                            m('div#user-name',
                            [
                                m('h8', user.name)
                            ]),
                            m('div#highest-score-header',
                            [
                                m('h8', 'Highest Score:')
                            ]),
                            m('div#highest-score',
                            [
                                m('h8', score.score)
                            ]),
                            m('div#highest-score',
                            [
                                m('h8', message)
                            ])

                        ])
                    )
                ]
            ),
            m('main',
                m ('div', { class: 'container-fluid'}, [
                    m('nav', { class: 'navbar navbar-expand-lg navbar-light bg-light mobile-only'}, [
                        m('div', { class: 'container-fluid'} ,
                            m('button#sidebar-collapse', { class: 'btn btn-info'}, [
                                m('i', { class: 'fas fa-align-left'}, ''),
                                m('span', 'toggle sidebar')
                            ])
                        )
                    ] )

                ])
            )
        ]
    );
    }
};


m.mount(document.body, Everything);

$(document).ready( () => {
    $('#sidebar-collapse').on('click',  () => {
            $('.sidebar').toggleClass('active');
        });

    $('#new-user-field').on('input',  () => {
       // m.withAttr('value', userNameField.setName);
        // console.info(userNameField.name);
    });

    $('#make-new-user').on('click',  () => {
       // let test: User = new User(0, userNameField.name);
        // test.postUser();
        // Make new user with name?
          // $('.sidebar').toggleClass('active');
        });
    });

    window.addEventListener('resize', () => {
       if (window.innerHeight < window.innerWidth) {
           $('.sidebar').toggleClass('active');
       }
});
