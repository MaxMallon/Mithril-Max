

import m from 'mithril';

/**
 * @author Max Mallon
 */
export class Score {
    public id = 0;
    public score = 0;
    public status = 'ok';
    private siteURL = 'http://localhost:3000/score/';
    constructor( status: string, id: number, score: number = 0 ){
        this.status = status;
       this.id = id;
       this.score = score;
    }

    getScore() {
        m.request({
            method: 'GET',
            url: this.siteURL + this.id.toString(),         
            withCredentials: false,
        })
        .then((result: any) => {
            this.status = result.status;
        this.id = result.id;
        this.score = result.score;
        });
    }

    postScore() {
        const  score: Score = new Score('ok', 0);
        m.request({
            method: 'POST',
            url: this.siteURL + '',
            data: {score: this.score, id: this.id},       
            withCredentials: false,
        })
        .then((result: any) => {
            score.status = result.status;
            score.score = result.score;
            score.id = result.id;
        });
        return score;
    }

    deleteScore(id: number){
        let resultString : string = '';
        this.id = id;
        m.request({
            method: 'DELETE',
            url: this.siteURL + this.id.toString(),
            withCredentials: false,
        }).then((result: any) => {
            resultString = result.status;
        });
        return resultString;
    }
}
