import axios from 'axios';
import { Api } from '../config';

export async function saveQuestionDetail(body) {
  return axios.post(Api.baseUrl + "/question/submit", body
  ).then(res => {
    return res
  })
    .catch(err => {
      console.log(err)
    })
}

export async function editQuestionDetail(body) {
  return axios.post(Api.baseUrl + "/question/update", body
  ).then(res => {
    return res;
  })
    .catch(err => {
      console.log(err);
    })
}

export async function createQuestionBlock(body) {
  return axios.post(Api.baseUrl + "/questionBlock", body).then(res => {
    return res;
  })
    .catch(err => {
      console.log(err);
    })
}

export async function getquestionBlockData() {
  return axios.get(Api.baseUrl + "/questionBlock").then(res => {
    return res;
  })
    .catch(err => {
      console.log(err);
    })
}

export async function getquestionsData(id) {
  return axios.get(Api.baseUrl + "/questionBlock/" + id).then(res => {
    return res;
  })
    .catch(err => {
      console.log(err);
    })
}

