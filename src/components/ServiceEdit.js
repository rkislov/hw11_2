import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchService, changeServiceField, saveService } from '../actions/actionCreators';
import spinner from '../img/spinner.gif'
import '../App.css';
import {useHistory} from 'react-router-dom';

function ServiceEdit({match}) { 
  const {item, loading, error, redirect} = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    // fetchService(dispatch, match.params.id);
    dispatch(fetchService(match.params.id))
  }, [dispatch])
  
  if (redirect) {
    history.push("/services");
  }

  if (loading) {
    return <img alt="" src={spinner} />
  }

  if (error) {
    return <div className="errorBlock"><p className="errorText">Something went wrong try again</p></div>;
  }

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const cancel = () => {
    history.push("/services")
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    let form = evt.target;
    // saveService(dispatch, match.params.id, form.name.value, form.price.value, form.content.value);
    dispatch(saveService(match.params.id, form.name.value, form.price.value, form.content.value))
  }

  return (
    redirect ? null :
    <form id="form" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="name">Название</label></td>
            <td><input id="name" name="name" onChange={handleChange} value={item.name}/></td>
          </tr>
          <tr>
            <td><label htmlFor="satisfaction">Стоимость</label></td>
            <td><input id="price" name="price" onChange={handleChange} value={item.price}/></td>
          </tr>
          <tr>
            <td><label htmlFor="content">Описание</label></td>
            <td><input id="content" name="content" onChange={handleChange} value={item.content}/></td>
          </tr>
          <tr>
            <td><button type="cancel" onClick={() => cancel()}>Отмена</button></td>
            <td><button type="submit">Сохранить</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default ServiceEdit;
