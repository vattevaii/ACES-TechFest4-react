import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function ScheduleList() {
   return (<Table striped hover bordered responsive>
      <thead className='ms-1 fs-2'><tr><td colSpan='4'>Schedules</td></tr></thead>
      <thead><tr>
         <th>Day</th><th>Date</th><th>Schedule</th><th>Appointments</th>
      </tr></thead>
      <tbody><tr>
         <td>Monday</td><td>17th March 2021</td>
         <td className='p-0'><Table className='m-0'><tbody>
            <tr><td>12 AM - 8 AM</td></tr><tr><td>12 PM - 4 PM</td></tr>
         </tbody></Table></td>
         <td className='p-0'><Table className='m-0'><tbody>
            <tr><td>16</td></tr><tr><td>20</td></tr>
         </tbody></Table></td>
      </tr><tr>
            <td>Monday</td><td>24th March 2021</td><td>10 AM - 3 PM</td><td>6</td>
         </tr><tr>
            <td>Monday</td><td>2nd April 2021</td><td>10 AM - 4 PM</td><td>0</td>
         </tr>
      </tbody>
      <tfoot><tr><td colSpan='4'><Link to="/schedules">View All</Link></td></tr></tfoot>
   </Table>);
}

export default ScheduleList;