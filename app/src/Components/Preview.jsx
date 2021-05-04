import '../App.css';

const Preview = (props) => {
      
      if (props  &&  props.tblContent.length > 0) {
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
                              {props.tblContent.map(el =>
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