import { QuizQuestion } from './../models/quiz-question';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiURL = environment.apiUrl;
  currentUser: any;
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.currentUser.accessToken}`
          })
      };
  }

  getAll(): Observable<Quiz[]> {
      return this.httpClient
          .get<Quiz[]>(this.apiURL + '/api/quiz/get-all', this.httpOptions)
          .pipe();
  }

  getQuestions(quizId: string, page: number, size: number, query: string): Observable<QuizQuestion[]> {
    return this.httpClient
        .get<QuizQuestion[]>(this.apiURL + '/api/quiz/questions/filter?quizId='+ quizId +'&pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
        .pipe();
  }

  getPage(page: number, size: number, query: string): Observable<Quiz[]> {
      return this.httpClient
          .get<Quiz[]>(this.apiURL + '/api/quiz/filter?pageSize=' + size + '&pageIndex=' + page + '&filter=' + query, this.httpOptions)
          .pipe();
  }

  createQuiz(item: any): Observable<Quiz> {
      return this.httpClient
          .post<Quiz>(this.apiURL + '/api/quiz/create-quiz', JSON.stringify(item), this.httpOptions)
          .pipe();
  }

  createQuestion(item: any): Observable<Quiz> {
    return this.httpClient
        .post<Quiz>(this.apiURL + '/api/quiz/create-question', JSON.stringify(item), this.httpOptions)
        .pipe();
  }

  findQuizById(id: string): Observable<Quiz> {
      return this.httpClient
          .get<Quiz>(this.apiURL + '/api/quiz/get-by-id/' + id, this.httpOptions)
  }

  findQuizBySlug(slug: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/get-by-slug/' + slug, this.httpOptions)
  }

  update(id: string, item: any): Observable<Quiz> {
      return this.httpClient
          .put<Quiz>(this.apiURL + '/api/quiz/update/' + id, JSON.stringify(item), this.httpOptions)
  }

  delete(id: string) {
      return this.httpClient
          .delete<Quiz>(this.apiURL + '/api/quiz/delete/' + id, this.httpOptions)
  }

  deleteQuestion(id: string) {
    return this.httpClient
        .delete<Quiz>(this.apiURL + '/api/quiz/delete-question/' + id, this.httpOptions)
  }

  takeQuiz(id: string): Observable<any> {
    return this.httpClient
        .get<any>(this.apiURL + '/api/quiz/take-quiz/' + id, this.httpOptions)
  }

  getQuestionsOfQuiz(id: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/get-questions/' + id, this.httpOptions)
  }

  chooseAnswer(quizTakenId: string, questionId: string, answerId: string, isCorrect: boolean): Observable<any> {
    return this.httpClient
        .get<any>(this.apiURL + '/api/quiz/choose-answer?quizTakenId=' + quizTakenId + '&questionId=' + questionId + '&answerId=' + answerId + '&isCorrect=' + isCorrect, this.httpOptions)
  }

  submitTest(id: string, currentDuration: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/submit-test/' + id + '?currentDuration=' + currentDuration, this.httpOptions)
  }

  updateDuration(id: string, currentDuration: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/update-duration/' + id + '?currentDuration=' + currentDuration, this.httpOptions)
  }

  getAnswersOfQuestion(id: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/get-answers/question/' + id, this.httpOptions)
  }

  getAnswersTaken(id: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/get-answers-taken/' + id, this.httpOptions)
  }

  getResult(id: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/get-result/' + id, this.httpOptions)
  }

  getResults(id: string): Observable<Quiz> {
    return this.httpClient
        .get<Quiz>(this.apiURL + '/api/quiz/get-results/' + id, this.httpOptions)
  }

}
