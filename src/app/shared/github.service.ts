import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

const baseUrl = 'https://api.github.com/repos/telerik/kendo-ui-core/issues';

@Injectable()
export class GithubService {
    private ghToken = 'Yjk1MTE2NzkyY2JhNWE4MTY5YTFlYzEwNjQwZDhjMTY1MzVjNjQxOQ==';
    private headers = new Headers({
        // Generate your own token through
        // https://github.com/settings/tokens

        'Authorization': 'token b95116792cba5a8169a1ec10640d8c16535c6419'
    });
    constructor(public http: Http) { }

    getGithubIssues(pages) {
        return Observable.forkJoin(this.getIssuesUrls(pages));
    }

    getIssuesUrls({ pages }) {
        const result = [];
        for (let index = 1; index < pages; index++) {
            result.push(
                this.http.get(`${baseUrl}?state=all&page=${index}&per_page=100`, { headers: this.headers })
                    .map(this.handleResponse)
            );
        }
        return result;
    }

    getGithubUser(username) {
        return this.http.get(`https://api.github.com/users/${username}`, { headers: this.headers })
            .map(this.handleResponse);
    }

    getGithubIssue(id: number) {
        return this.http.get(`${baseUrl}/${id}`, { headers: this.headers })
            .map(this.handleResponse);
    }

    handleResponse(res: Response): any {
        return res.json();
    }
}
