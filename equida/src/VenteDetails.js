import React, { useState, useEffect } from 'react';
import moment from 'moment';

const VenteDetails = ({ vente }) => {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    console.log(vente);
    fetch(`http://127.0.0.1/Equida-Spa2/public/api/vente/consulter/${vente.idVente}`)
      .then(response => response.json())
      .then(data => setLots(data))
      .catch(error => console.log(error));
  }, [vente.idVente]);

  const formatDate = date => {
    console.log(date);
    const formattedDate = moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
    return formattedDate;
  };
  return (
    <div>
      <h1>
        Vente : {vente.nom} du {vente.dateDebut} au {formatDate(vente.dateFin)}
      </h1>

      <table>
        <thead>
          <tr>
            <th>Nom du Cheval</th>
            <th>Race</th>
            <th>Mise A prix</th>
          </tr>
        </thead>
        <tbody>
          {lots.map(lot => (
            <tr key={lot.lotChevalNom}>
              <td>{lot.lotChevalNom}</td>
              <td>{lot.lotChevalRaceLibelle}</td>
              <td>{lot.lotMiseAPrix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenteDetails;
