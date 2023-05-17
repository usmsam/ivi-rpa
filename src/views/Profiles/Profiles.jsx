import { Fragment, useEffect } from "react";
import { AiFillDelete, AiOutlineEnter } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setProfiles } from "../../shared/store/slices/profiles";

import { getProfiles, profileDelete } from "./../../shared/api/routes/profiles";

import s from "./profiles.module.scss";
export const Profiles = ({
  onClick = () => {},
  createHandler = () => {},
  setEditableProfile = () => {},
}) => {
  const dispatch = useDispatch();
  let { profiles } = useSelector((state) => state.profiles);

  const deleteProfile = async (id) => {
    const { data } = await profileDelete(id);
    getProfiles().then((res) => dispatch(setProfiles(res.data)));
  };

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const { data } = await getProfiles();
        dispatch(setProfiles(data));
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Профили</h2>
        <div className={s.cenariosSearch}>
          <input placeholder="Введите ID профиля" />
          <button className={s.enterBtn}>
            <AiOutlineEnter />
          </button>
        </div>
        <div className={s.uploadBtn} onClick={createHandler}>
          Создать профиль +
        </div>
      </div>
      <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>ID</th>
              <th>Name</th>
              <th>Кол-во сгенерированных</th>
              <th>Предел генерации:</th>
              <th></th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            {profiles.length
              ? profiles.map(({ id, max_quantity, name, quantity }) => {
                  return (
                    <Fragment key={id}>
                      <tr>
                        <th>{id}</th>
                        <th>{name}</th>
                        <td>{quantity}</td>
                        <td>{max_quantity}</td>
                        <td>
                          <BsPencilSquare
                            className={s.BsPencilSquare}
                            onClick={(e) => {
                              onClick(e);
                              setEditableProfile(id);
                            }}
                          />
                          <AiFillDelete
                            className={s.AiFillDelete}
                            onClick={() => deleteProfile(id)}
                          />
                        </td>
                      </tr>
                    </Fragment>
                  );
                })
              : "NO content"}
          </tbody>
          <br></br>
        </table>
        {/* <div className={s.loadMore}>Ракрыть полностью ↓</div> */}
      </div>
    </div>
  );
};
