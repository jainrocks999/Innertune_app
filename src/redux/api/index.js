import {mainURl} from '../constanst';
export default class Api {
  static getToken = async data => {
    var formdata = new FormData();
    formdata.append('grant_type', 'password');
    formdata.append('client_id', '2');
    formdata.append(
      'client_secret',
      'UtjTgffhEHELdKHPggA6feRwByUtcDbWrUJs2LJy',
    );
    formdata.append('username', data.email);
    formdata.append('password', data.password);
    formdata.append('scope', '*');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const response = await fetch(
      'https://stimuli.forebearpro.co.in/oauth/token',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.log('error', error));
    return response;
  };
  static API_POST = async data => {
    console.log(data);
    var myHeaders = {
      Authorization: `Bearer ${data.token}`,
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data.formdata,
      redirect: 'follow',
    };
    console.log(`${mainURl}${data.url}`);
    return await fetch(`${mainURl}${data.url}`, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.log('error', error));
  };
  static API_GET = async data => {
    let params = data.params;
    var myHeaders = {
      Authorization: `Bearer ${data.token}`,
    };
    const queryString = Object.keys(params)
      .map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
      )
      .join('&');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    // console.log(`${mainURl}${data.url}?${queryString}`);

    return await fetch(`${mainURl}${data.url}?${queryString}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        return JSON.parse(result);
      })
      .catch(error => error);
  };
}
