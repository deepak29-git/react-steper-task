import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Input, FormGroup, FormControl, FormLabel, FormControlLabel, RadioGroup,Checkbox, Radio,InputLabel,Select,MenuItem ,TextareaAutosize} from '@mui/material';

import './App.css';
const steps = ['Project Info', 'Services', 'Project Details', 'Additional Info'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [age, setAge] = React.useState('');
  const [checkBox, setCheckBox] = React.useState(false);
  const [input,setInput]=React.useState("");
  const [textAreaValue,setTextAreaValue]=React.useState("")
  const [file,setFile]=React.useState("")
  const [gender,setGender]=React.useState("");
  const [showBtn,setShowBtn]= React.useState(false)


  const handleChange = (event) => {
    setAge(event.target.value);
    
  };


  function textAreaHandler(e){
    setTextAreaValue(e.target.value)
  }

  function submitHandler(){
    console.log(input)
    console.log(age)
    console.log(textAreaValue)
    console.log(file)
    console.log(checkBox)
    console.log(gender)
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => (prevActiveStep ===3 ? setShowBtn(true) : prevActiveStep + 1));
    
    setSkipped(newSkipped);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
 
  };

  const BoxStyle = {
    "margin": "auto"
  }
  return (
    
    <Box sx={{ width: '50%' }} style={BoxStyle}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>


          );
        })}
      </Stepper>

     
      <h3>Project Info</h3>

      <FormGroup>

        <Input style={{marginBottom:"2rem"}} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Project Title" />
        
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select style={{marginBottom:"2rem"}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
<TextareaAutosize
  onChange={(e)=>textAreaHandler(e)}
  aria-label="minimum height"
  minRows={3}
  placeholder="Description"
  style={{ width: 200,marginBottom:"2rem" }}
/>
<Input onChange={(e)=>setFile(e.target.value)} style={{marginBottom:"2rem"}} type="file"/>
<span>
<Checkbox 
  onChange={()=>setCheckBox(!checkBox)}
/>
<label htmlFor="">Accept all the terms & condition</label>
  </span>


        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e)=>setGender(e.target.value)}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        

      </FormGroup>
      {
        showBtn ? <button style={{
          display:"block",
          margin:"auto"
        }} className="btn" onClick={submitHandler}>Submit</button>
        : null
      }
      

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}></Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
