import React, { useEffect, useState } from "react";
import s from "./FuneralHome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFuneralHomes, deleteFuneralHome } from "../../../redux/actions/funeralHomeActions";
import EditFuneral from "./EditFuneral";
import CreateFuneral from "./CreateFuneral";

const FuneralHome = () => {
  const dispatch = useDispatch();
  const funeralHomes = useSelector((state) => state.funeralHome.funeralHomes);
  const [selectedFuneralHome, setSelectedFuneralHome] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    dispatch(getFuneralHomes());
  }, [dispatch]);

  const handleEdit = (funeralHome) => {
    setSelectedFuneralHome(funeralHome);
    setShowEdit(true);
  };

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleCancel = () => {
    setSelectedFuneralHome(null);
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteFuneralHome(id));
  };

  return (
    <div className={s.container}>
      <div className={s.dashboard}>
        <h2>Funeral Homes</h2>
        <table className={s.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {funeralHomes.map((funeral) => (
              <tr key={funeral._id}>
                <td>{funeral.id}</td>
                <td>{funeral.name}</td>
                <td>${funeral.price}</td>
                <td className={s.btnCell}>
                  <button onClick={() => handleEdit(funeral)}>Edit</button>
                  <button className={s.btnDelete} onClick={() => handleDelete(funeral.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={s.btnCreateContainer}>
          <button className={s.btnCreate} onClick={handleCreate}>Create</button>
        </div>
      </div>
      {
        showEdit && (
          <EditFuneral
            funeralHome={selectedFuneralHome}
            handleCancel={handleCancel}
          />
        )
      }
      {
        showCreate && (
          <CreateFuneral handleCancel={() => setShowCreate(false)} />
        )
      }
    </div>
  )
};


export default FuneralHome;