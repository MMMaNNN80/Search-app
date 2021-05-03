import '../App.css';

const Preview = (props) => {
      if (props.cont.length > 0 && props) {
            return (
                  <div className="text-center preview">
                        <p className = "p_text"> Превью условий поиска </p>
                        <table className="table_">
                              <th>
                                  ID <br></br>
                                    внешний ключ
                                       
                  </th>
                              <th>
                                     QUERY <br></br>
                                    запрос
                  </th>
                              {props.cont.map(el =>
                                    <tr>
                                          <td>{el.id}</td>
                                          <td>{el.query}</td>
                                    </tr>
                              )}
                        </table>

                  </div>
            );
      } else { return '' }
}

export default Preview;