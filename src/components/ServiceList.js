import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices } from '../actions/actionCreators';
import spinner from '../img/spinner.gif'
import '../App.css';
import {useHistory} from 'react-router-dom';

function ServiceList(props) {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // fetchServices(dispatch);
    dispatch(fetchServices());
  }, [dispatch])

  const handleRemove = id => {
    // removeService(dispatch, id);
    dispatch(removeService(id));
  }

  const handleEdit = id => {
    history.push(`/services/${id}`);
  }

  if (loading) {
    return <img alt="" src={spinner} />
  }

  if (error) {
    return <div className="errorBlock"><p className="errorText">Something went wrong try again</p></div>;
  }

  return (
    <table>
      <tbody>
        {items.map(o => (
          <tr key={o.id}>
            <td>{o.name}</td>
            <td>{o.price}</td>
            <td>
              <button onClick={() => handleEdit(o.id)}>\</button>
              <button onClick={() => handleRemove(o.id)}>x</button>
            </td>            
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ServiceList
