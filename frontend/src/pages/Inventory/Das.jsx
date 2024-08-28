/* eslint-disable no-unused-vars */
  /* eslint-disable react/jsx-no-undef */

import React from 'react'
import { Paper,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'

const usertable= () => {

return(

<TableContainer component={Paper}>
<Table>
<TableHead>
<TableRow>
    
<TableCell>ID</TableCell>
<TableCell>Name</TableCell>
<TableCell>Action</TableCell>

</TableRow>
</TableHead>
<TableBody>

    
</TableBody>
</Table>
</TableContainer>
)
}
export default usertable
 

