// import React from 'react';
// import { Style } from './style';

// export function Survey({intro, outro}) {
// return <>
// <Style />
// <table width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: auto; border-spacing: 0;" className="ee_resizable ee_mobiletemplate" data-dmtmp="true"  dir="{{direction}}">
//   <tbody>
//     <tr>
//       <td align="center" cellpadding="0" cellspacing="0" style="background-color: rgb(240, 240, 240);"><table width="600" border="0" cellspacing="0" cellpadding="0" style="table-layout: auto; border-spacing: 0;" className="eem_mainouterzone">
//           <tbody>
//             <tr>
//               <td className="ee_dropzone" style="padding-top: 0px;padding-{{right}}: 0px;padding-bottom: 0px;padding-{{left}}: 0px;" align="{{left}}"><table className="ee_borders eeb_width ee_element" cellpadding="0" cellspacing="0" data-eewidth="600" style="width: 600px; table-layout: auto; border-spacing: 0;">
//                   <tbody>
//                     <tr>
//                       <td className="ee_pad" style="padding-top: 20px;padding-{{right}}: 10px;padding-bottom: 20px;padding-{{left}}: 10px; width: auto;"><table width="100%" border="0" cellspacing="0" cellpadding="0" className="ee_columns eev_element" ee-type="container" style="width: 580px; position: relative; table-layout: auto; border-spacing: 0;" data-eewidth="580">
//                           <tbody>
//                             <tr>
//                               <td width="100%" valign="top" className="ee_dropzone ved-scaled-cols" align="{{left}}" style="width: 580px; padding-top: 0px;padding-{{right}}: 0px;padding-bottom: 0px;padding-{{left}}: 0px;"><table className="ee_borders ee_contains_bdr ee_element" cellpadding="0" cellspacing="0" data-eewidth="580" style="table-layout: auto; background-color: rgb(255, 255, 255); border-spacing: 0;">
//                                   <tbody>
//                                     <tr>
//                                       <td className="ee_pad ee_bdr" style="border-top-width: 5px; border-top-style: solid; border-top-color: rgb(221, 221, 221); border-bottom-width: 5px; border-bottom-style: solid; border-bottom-color: rgb(221, 221, 221); padding-top: 25px;padding-{{right}}: 25px;padding-bottom: 2px;padding-{{left}}: 25px;"><table style="table-layout: auto; border-spacing: 0;" cellpadding="0" cellspacing="0" className="eebdrtbl">
//                                           <tbody>
//                                             <tr>
//                                               <td className="eeb_width" style="width: 530px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" className="ee_columns eev_element" ee-type="container" style="width: 530px; position: relative; table-layout: auto; border-spacing: 0;" data-eewidth="530">
//                                                   <tbody>
//                                                     <tr>
//                                                       <td width="100%" valign="top" className="ee_dropzone ved-scaled-cols" align="{{left}}" style="width: 530px; padding-top: 0px;padding-{{right}}: 0px;padding-bottom: 0px;padding-{{left}}: 0px;"><div className="ee_editable ee_element" ee-type="element">
//                                                           {intro}
//                                                           <p style="margin: 0px; line-height: 150%; font-family: arial, helvetica, sans-serif; text-align: {{left}}; font-size: 15px; color: rgb(69, 69, 69);">{{{question}}}</p>
//                                                         </div>
//                                                         <table className="ee_element ee_borders eeb_width" cellpadding="0" cellspacing="0" data-eewidth="530" style="table-layout: auto; width: 530px; border-spacing: 0;"><tbody><tr><td className="ee_pad" style="padding-top: 15px; padding-bottom: 25px; width: auto;"><table width="100%" border="0" cellspacing="0" cellpadding="0" className="ee_columns eev_element" ee-type="container" style="width: 530px; position: relative; table-layout: auto; border-spacing: 0;" data-eewidth="530">
//                                                                   <tbody>
//                                                                     <tr>
//                                                                       <td width="100%" valign="top" className="ee_dropzone ved-scaled-cols " align="{{left}}" style="width: 530px; padding: 0px;"><div className="ee_editable ee_element ee_headercenter show_on_mobile" ee-type="element" style="width: 0; max-height: 0; overflow: hidden; float: {{left}}; display: none;">
//                                                                           <p style="margin: 0px; font-family: arial, helvetica, sans-serif; line-height: 21px; color: rgb(176, 176, 176); font-size: 14px;">{{unlikely}}</p>
// 						                                               </div>
//                                                                         <table className="ee_borders eeb_width ee_element" cellpadding="0" cellspacing="0" style="width: 530px; table-layout: auto; border-spacing: 0;" data-eewidth="530">
//                                                                           <tbody>
//                                                                             <tr>
//                                                                               <td className="ee_pad" style="padding-top: 10px; padding-bottom: 10px; width: auto;"><table width="100%" border="0" cellspacing="0" cellpadding="0" className="ee_columns eev_element" ee-type="container" style="width: 530px; position: relative; table-layout: auto; border-spacing: 0;" data-eewidth="530">
//                                                                                   <tbody>
//                                                                                     <tr>
//                                                                                       {{#each ratings}}
//                                                                                       {{/each}}
//                                                                                     </tr>
//                                                                                   </tbody>
//                                                                                 </table></td>
//                                                                             </tr>
//                                                                           </tbody>
//                                                                         </table><table width="100%" border="0" cellspacing="0" cellpadding="0" className="ee_columns ee_element" ee-type="container" style="table-layout: auto; width: 530px; position: relative; border-spacing: 0; border-spacing: 0;" data-eewidth="530"><tbody><tr><td width="50%" valign="top" className="ee_dropzone ved-scaled-cols" align="{{left}}" style="width: 261px; padding: 0px;"><div className="ee_editable ee_element ee_headercenter hide" ee-type="element">
//                                                                           <p style="margin: 0px; font-family: arial, helvetica, sans-serif; line-height: 21px; color: rgb(176, 176, 176); font-size: 14px;">{{unlikely}}</p>
//                                                                         </div></td><td width="8" valign="top" className="eegap" style="width: 8px; padding: 0px;"><img src="https://i.emlfiles.com/cmpimg/t/s.gif" style="display:block" height="10" width="8"></td><td width="50%" valign="top" className="ee_dropzone ved-scaled-cols" align="{{left}}" style="width: 261px; padding: 0px;"><div className="ee_editable ee_element ee_headercenter" ee-type="element">
//                                                                           <p style="margin: 0px; font-family: arial, helvetica, sans-serif; line-height: 21px; color: rgb(176, 176, 176); text-align: {{right}}; font-size: 14px;">{{likely}}</p>
//                                                                         </div></td></tr></tbody></table>
//                                                                         </td>
//                                                                     </tr>
//                                                                   </tbody>
//                                                                 </table></td></tr></tbody></table>
//                                                         <div className="ee_editable ee_element" ee-type="element">
//                                                           {outro}
//                                                         </div></td>
//                                                     </tr>
//                                                   </tbody>
//                                                 </table></td>
//                                             </tr>
//                                           </tbody>
//                                         </table></td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                                 <table className="ee_borders eeb_width ee_element" cellpadding="0" cellspacing="0" style="width: 580px; table-layout: auto; border-spacing: 0;" data-eewidth="580">
//                                   <tbody>
//                                     <tr>
//                                       <td className="ee_pad" style="padding-top: 15px; width: auto;"><table width="100%" border="0" cellspacing="0" cellpadding="0" className="ee_columns eev_element" ee-type="container" style="width: 580px; position: relative; table-layout: auto; border-spacing: 0;" data-eewidth="580">
//                                           <tbody>
//                                             <tr>
//                                               <td width="50%" valign="top" className="ee_dropzone ved-scaled-cols ee_headercenter" align="{{left}}" style="width: 290px; padding-top: 4px;padding-{{right}}: 0;padding-bottom: 0;padding-{{left}}: 0;"><div className="ee_editable ee_element" ee-type="element">
//                                                 {{#if showPoweredBy}}
//                                                   <p style="margin: 0px; text-align: {{left}}; font-family: arial, helvetica, sans-serif; line-height: 150%; color: rgb(106, 106, 106);font-size: 12px;"><font style="font-size: 12px;">Powered by </font><a href="https://satismeter.com/" style="color: {{colors.primary}}; font-size: 12px; text-decoration: none;"><b>SatisMeter</b></a><br>
//                                                   </p>
//                                                 {{/if}}
//                                                 </div></td>
//                                                 {{#if unsubscribeUrl}}
//                                                   <td width="50%" valign="top" className="ee_dropzone ved-scaled-cols ee_headercenter" align="{{left}}" style="width: 290px; padding-top: 4px;padding-{{right}}: 0;padding-bottom: 0;padding-{{left}}: 0;"><div className="ee_editable ee_element" ee-type="element">
//                                                     <p style="margin: 0px; text-align: {{right}}; font-family: arial, helvetica, sans-serif; line-height: 150%; font-size: 12px;"><a href="{{unsubscribeUrl}}" style="color: {{colors.primary}}; text-decoration: none;">Unsubscribe</a></p>
//                                                   </div></td>
//                                                 {{/if}}
//                                             </tr>
//                                           </tbody>
//                                         </table></td>
//                                     </tr>
//                                   </tbody>
//                                 </table></td>
//                             </tr>
//                           </tbody>
//                         </table></td>
//                     </tr>
//                   </tbody>
//                 </table></td>
//             </tr>
//           </tbody>
//         </table></td>
//     </tr>
//   </tbody>
// </table>
// </>;
// }
