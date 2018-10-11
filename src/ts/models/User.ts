

import m from 'mithril';

/**
 * @author Max Mallon
 */
export class User {
    public status = 'ok';
    public name = '';
    public id = 0;
    private siteURL = 'http://localhost:3000/user/';
    constructor( status: string, id: number, name: string = '' ) {
        this.status = status;
        this.name = name;
        this.id = id;
    }

getUser() {
    m.request({
        method: 'GET',
        url: this.siteURL + this.id.toString(),
        withCredentials: false,
    })
    .then((result: any) => {
        this.status = result.status;
        this.id = result.id;
        this.name = result.name;
    });
}

     postUser() {
        const  user: User = new User('ok', 0);
        m.request({
            method: 'POST',
            url: this.siteURL + '',
            data: {name: this.name},
            withCredentials: false,
        })
        .then((result: any) => {
            user.status = result.status;
            user.name = result.name;
            user.id = result.id;
        });
        return user;
    }

    deleteUser(id: number) {
        let resultString = '';
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
