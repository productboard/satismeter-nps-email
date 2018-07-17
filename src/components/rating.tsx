import React from 'react';

export function Rating({ number, url, isLast, colors }: any) {
  // TODO: if url check, width, valign on <td>
  return (
    <>
      <td
        className="ee_dropzone ved-scaled-cols"
        style={{ width: 43, padding: 0, backgroundColor: colors.primary }}
      >
        <table
          className="ee_element ee_borders eeb_width"
          cellPadding="0"
          cellSpacing="0"
          style={{ width: 43, tableLayout: 'auto', borderSpacing: 0 }}
          data-eewidth="43"
        >
          <tbody>
            <tr>
              <td className="ee_pad" style={{ width: 'auto', padding: 0 }}>
                <div
                  className="ee_editable eev_element"
                  ee-type="element"
                  style={{ width: 43 }}
                >
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontFamily: 'arial, helvetica, sans-serif',
                      color: 'rgb(255, 255, 255)',
                      fontSize: 14
                    }}
                  >
                    <b>
                      <a
                        href={url}
                        style={{
                          display: 'block',
                          lineHeight: '100%',
                          color: colors.background,
                          textDecoration: 'none',
                          border: `12px solid ${colors.primary}`
                        }}
                      >
                        {number}
                      </a>
                    </b>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      {isLast ? (
        <>
          <td className="eegap" style={{ width: 2, padding: 0 }}>
            <img
              src="https://i.emlfiles.com/cmpimg/t/s.gif"
              style={{ display: 'block' }}
              height="1"
              width="2"
            />
          </td>
          <td className="eegap hide" style={{ width: 3, padding: 0 }}>
            <img
              src="https://i.emlfiles.com/cmpimg/t/s.gif"
              style={{ display: 'block' }}
              height="1"
              width="3"
            />
          </td>
        </>
      ) : (
        ''
      )}
    </>
  );
}
