import m from 'mithril';
import { User } from '../models/User';
import { Score } from '../models/Score';

export class MainWindow {
    private user : User;
    private score : Score;
    public static nameFieldValue : string;
    public static idFieldValue : number;
    public static scoreFieldValue : number;

    constructor () {
        MainWindow.nameFieldValue = " ";
        MainWindow.idFieldValue = 0;
        MainWindow.scoreFieldValue = 0;
        this.user = new User(MainWindow.idFieldValue);
        this.user.getUser();
        this.score = new Score(MainWindow.idFieldValue);
    }
    
        

    public setName(value : string){
        MainWindow.nameFieldValue = value;
    }

    public sendName(value : string){
        let test: User = new User(0, MainWindow.nameFieldValue);
        test.postUser();
    }
    public setID(value : number){
        MainWindow.idFieldValue = value;
    }

    public sendGetID(value : number){
        this.user = new User(MainWindow.idFieldValue);
        this.user.getUser();
        m.redraw();
    }

    public sendDeleteID(value : number){
        let test: User = new User(MainWindow.idFieldValue);
        test.deleteUser(MainWindow.idFieldValue);
    }
    public setScore(value : number){
        MainWindow.scoreFieldValue = value;
    }
    public uploadScore(value : number){
        let test: Score = new Score(MainWindow.idFieldValue, MainWindow.scoreFieldValue);
        test.postScore();
    }
    public sendGetScore(value : number){
        this.score = new Score(MainWindow.idFieldValue);
        this.score.getScore();
    }

    public sendDeleteScore(value : number){
        let test: Score = new Score(MainWindow.idFieldValue);
        test.deleteScore(MainWindow.idFieldValue);

    }

    view() {
        return m("div",{class:"main-window"}, 
            [
                m("nav",  { class: "sidebar" }, 
                    [
                        m("div#sidebar-collapse-title", { class: "sidebar-header" },
                            [
                                m("h3", "Scores and Users" ),
                                m("strong", "Max")
                            ]
                        ),
                        m("ul", { class:"list-unstyled components" },
                            m("li", { class: "list-unstyled components"}, [
                                m("div#user-field-header",
                                [
                                    m("h8", "Enter a player name")
                                ]),
                                m("input#new-user-field", {
                                    oninput: m.withAttr("value", this.setName),
                                    class: "input field-info",}, [
                                    m("i", {class: "fas fa-algin-left"}, ""),
                                    m("span", "Field")
                                ]),
                                m("button#make-new-user", {
                                    onclick: m.withAttr("value", this.sendName),
                                     class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "Upload User")
                                ]),m("div#user-field-header",
                                [
                                    m("h8", "============")
                                ]),
                                m("div#user-field-header",
                                [
                                    m("h8", "Enter a user ID")
                                ]),
                                m("input#user-id-field", {
                                    oninput: m.withAttr("value", this.setID),
                                    class: "input field-info",}, [
                                    m("i", {class: "fas fa-algin-left"}, ""),
                                    m("span", "Field")
                                ]),
                                m("button#get-user", {
                                    onclick: m.withAttr("value", this.sendGetID),
                                     class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "Get User by ID")
                                ]),
                                m("button#delete-user", {
                                    onclick: m.withAttr("value", this.sendDeleteID),
                                     class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "Delete user by ID")
                                ]),m("div#user-field-header",
                                [
                                    m("h8", "============")
                                ]),
                                m("div#user-field-header",
                                [
                                    m("h8", "Now enter a score")
                                ]),
                                m("input#score-field", {
                                    oninput: m.withAttr("value", this.setScore),
                                    class: "input field-info",}, [
                                    m("i", {class: "fas fa-algin-left"}, ""),
                                    m("span", "Field")
                                ]),
                                m("button#get-score", {
                                    onclick: m.withAttr("value", this.uploadScore),
                                     class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "Upload Score")
                                ]),
                                m("button#get-score", {
                                    onclick: m.withAttr("value", this.sendGetScore),
                                     class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "Get score by user ID")
                                ]),
                                m("button#delete-score", {
                                    onclick: m.withAttr("value", this.sendDeleteScore),
                                     class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "Delete score by user ID")
                                ]),m("div#user-field-header",
                                [
                                    m("h8", "============")
                                ]),
                                m("div#user-id-header",
                                [
                                    m("h8", "ID:")
                                ]),
                                m("div#user-id",
                                [
                                    m("h8", this.user.id)
                                ]),
                                m("div#user-name-header",
                                [
                                    m("h8", "Name:")
                                ]),
                                m("div#user-name",
                                [
                                    m("h8", this.user.name)
                                ]),
                                m("div#highest-score-header",
                                [
                                    m("h8", "Highest Score:")
                                ]),
                                m("div#highest-score",
                                [
                                    m("h8", this.score.score)
                                ]),

                            ])
                    
                        )
                    ]
                ),
                m("main",
                    m ("div", { class: "container-fluid"}, [
                        m("nav", { class: "navbar navbar-expand-lg navbar-light bg-light mobile-only"},[
                            m("div", { class: "container-fluid"} ,
                                m("button#sidebar-collapse", { class: "btn btn-info"}, [
                                    m("i", { class: "fas fa-align-left"}, ""),
                                    m("span", "toggle sidebar")
                                ])
                            )
                        ] )

                    ])

                )
              

            ]
        );
    }
}