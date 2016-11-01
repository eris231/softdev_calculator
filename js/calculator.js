document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

	var op_stack = [];
	var output_list = [];
	var pre_memory = "none";
	var last_operator, last_operand;
	var buttons = document.querySelectorAll("button");
	var bases = document.querySelectorAll(".bases");
	var mode = "DEC";
	var cur_val = 0;
	for(var i=0;i<buttons.length;i++) {
		buttons[i].addEventListener("click", function() {
			calc(this.getAttribute("value"));
		});
	}
	for(var i=0;i<bases.length;i++) {
		bases[i].addEventListener("mouseover", function() {
			this.style.backgroundColor = "#DCDCDC";
		});
		bases[i].addEventListener("mouseout", function() {
			this.style.backgroundColor = "#F0FFFF";
		});
		bases[i].addEventListener("click", function() {
			mode = this.children[0].innerText;
			console.log(mode);
			if(mode == "HEX") {
				document.querySelector("[value='A']").disabled = false;
				document.querySelector("[value='B']").disabled = false;
				document.querySelector("[value='C']").disabled = false;
				document.querySelector("[value='D']").disabled = false;
				document.querySelector("[value='E']").disabled = false;
				document.querySelector("[value='F']").disabled = false;
				document.querySelector("[value='9']").disabled = false;
				document.querySelector("[value='8']").disabled = false;
				document.querySelector("[value='7']").disabled = false;
				document.querySelector("[value='6']").disabled = false;
				document.querySelector("[value='5']").disabled = false;
				document.querySelector("[value='4']").disabled = false;
				document.querySelector("[value='3']").disabled = false;
				document.querySelector("[value='2']").disabled = false;
				document.getElementById("mainDisplay").innerHTML = document.getElementById("hexDisplay").innerHTML;
				document.getElementById("hexDisplay").style.color = "#42AAF4";
				document.getElementById("decDisplay").style.color = "#000000";
				document.getElementById("octDisplay").style.color = "#000000";
				document.getElementById("binDisplay").style.color = "#000000";
				document.getElementById("hexLabel").style.color = "#42AAF4";
				document.getElementById("decLabel").style.color = "#000000";
				document.getElementById("octLabel").style.color = "#000000";
				document.getElementById("binLabel").style.color = "#000000";
			}
			else if(mode == "DEC") {
				document.querySelector("[value='A']").disabled = true;
				document.querySelector("[value='B']").disabled = true;
				document.querySelector("[value='C']").disabled = true;
				document.querySelector("[value='D']").disabled = true;
				document.querySelector("[value='E']").disabled = true;
				document.querySelector("[value='F']").disabled = true;
				document.querySelector("[value='9']").disabled = false;
				document.querySelector("[value='8']").disabled = false;
				document.querySelector("[value='7']").disabled = false;
				document.querySelector("[value='6']").disabled = false;
				document.querySelector("[value='5']").disabled = false;
				document.querySelector("[value='4']").disabled = false;
				document.querySelector("[value='3']").disabled = false;
				document.querySelector("[value='2']").disabled = false;
				document.getElementById("mainDisplay").innerHTML = document.getElementById("decDisplay").innerHTML;
				document.getElementById("hexDisplay").style.color = "#000000";
				document.getElementById("decDisplay").style.color = "#42AAF4";
				document.getElementById("octDisplay").style.color = "#000000";
				document.getElementById("binDisplay").style.color = "#000000";
				document.getElementById("hexLabel").style.color = "#000000";
				document.getElementById("decLabel").style.color = "#42AAF4";
				document.getElementById("octLabel").style.color = "#000000";
				document.getElementById("binLabel").style.color = "#000000";
			}
			else if(mode == "OCT") {
				document.querySelector("[value='A']").disabled = true;
				document.querySelector("[value='B']").disabled = true;
				document.querySelector("[value='C']").disabled = true;
				document.querySelector("[value='D']").disabled = true;
				document.querySelector("[value='E']").disabled = true;
				document.querySelector("[value='F']").disabled = true;
				document.querySelector("[value='9']").disabled = true;
				document.querySelector("[value='8']").disabled = true;
				document.querySelector("[value='7']").disabled = false;
				document.querySelector("[value='6']").disabled = false;
				document.querySelector("[value='5']").disabled = false;
				document.querySelector("[value='4']").disabled = false;
				document.querySelector("[value='3']").disabled = false;
				document.querySelector("[value='2']").disabled = false;
				document.getElementById("mainDisplay").innerHTML = document.getElementById("octDisplay").innerHTML;
				document.getElementById("hexDisplay").style.color = "#000000";
				document.getElementById("decDisplay").style.color = "#000000";
				document.getElementById("octDisplay").style.color = "#42AAF4";
				document.getElementById("binDisplay").style.color = "#000000";
				document.getElementById("hexLabel").style.color = "#000000";
				document.getElementById("decLabel").style.color = "#000000";
				document.getElementById("octLabel").style.color = "#42AAF4";
				document.getElementById("binLabel").style.color = "#000000";
			}
			else if(mode == "BIN") {
				document.querySelector("[value='A']").disabled = true;
				document.querySelector("[value='B']").disabled = true;
				document.querySelector("[value='C']").disabled = true;
				document.querySelector("[value='D']").disabled = true;
				document.querySelector("[value='E']").disabled = true;
				document.querySelector("[value='F']").disabled = true;
				document.querySelector("[value='9']").disabled = true;
				document.querySelector("[value='8']").disabled = true;
				document.querySelector("[value='7']").disabled = true;
				document.querySelector("[value='6']").disabled = true;
				document.querySelector("[value='5']").disabled = true;
				document.querySelector("[value='4']").disabled = true;
				document.querySelector("[value='3']").disabled = true;
				document.querySelector("[value='2']").disabled = true;
				document.getElementById("mainDisplay").innerHTML = document.getElementById("binDisplay").innerHTML;
				document.getElementById("hexDisplay").style.color = "#000000";
				document.getElementById("decDisplay").style.color = "#000000";
				document.getElementById("octDisplay").style.color = "#000000";
				document.getElementById("binDisplay").style.color = "#42AAF4";
				document.getElementById("hexLabel").style.color = "#000000";
				document.getElementById("decLabel").style.color = "#000000";
				document.getElementById("octLabel").style.color = "#000000";
				document.getElementById("binLabel").style.color = "#42AAF4";
			}
		});
	}

	function calc(val) {
		var base;
		if(mode=="HEX") base=16;
		else if(mode=="DEC") base=10;
		else if(mode=="OCT") base=8;
		else if(mode=="BIN") base=2;
		console.log("op "+op_stack);
		console.log("list "+output_list);
		//var cur_val = document.getElementById("mainDisplay").getAttribute("value");
		if( isNumeric(val) || (val>="A" && val<="F")) {	//numbers
			if(base==16) val = "0x" + val;
			
			if(pre_memory == "add" || pre_memory == "sub" || pre_memory == "mul" || pre_memory == "div" || pre_memory == "mod") {
				//document.getElementById("mainDisplay").innerHTML = (parseInt(val, base).toString(base)).toUpperCase();
				//document.getElementById("mainDisplay").setAttribute("value", parseInt(val, base));
				//document.getElementById("mainDisplay").value = parseInt(val, base);
				cur_val = parseInt(val, base);
				op_stack.push(pre_memory);
			}
			else if(pre_memory == "equ") {
				//document.getElementById("mainDisplay").innerHTML = (parseInt(val, base).toString(base)).toUpperCase();
				//document.getElementById("mainDisplay").setAttribute("value", parseInt(val, base));
				//document.getElementById("mainDisplay").value = parseInt(val, base);
				cur_val = parseInt(val, base);
			}
			else if(pre_memory == "num" || pre_memory == "none") {
				//document.getElementById("mainDisplay").innerHTML = ((cur_val*base + parseInt(val, base)).toString(base)).toUpperCase();
				//document.getElementById("mainDisplay").setAttribute("value", cur_val*10 + parseInt(val, base));
				//document.getElementById("mainDisplay").value = cur_val*10 + parseInt(val, base);
				cur_val = cur_val*10 + parseInt(val, base);
			}
			pre_memory = "num";
		}
		else {
			if(val == "add" || val == "sub") {
				last_operator = val;
				if(pre_memory=="num") {
					output_list.push(cur_val);
					if(output_list.length>1) {
						while(op_stack.length) {
							var tmp_num1 = parseInt(output_list.pop());
							var tmp_num2 = parseInt(output_list.pop());
							var tmp_op = op_stack.pop();
							if(tmp_op=="add") cur_val = tmp_num1 + tmp_num2;
							else if(tmp_op=="sub") cur_val = tmp_num2 - tmp_num1;
							else if(tmp_op=="mul") cur_val = tmp_num1 * tmp_num2;
							else if(tmp_op=="div") cur_val = Math.floor(tmp_num2 / tmp_num1);
							else if(tmp_op=="mod") cur_val = tmp_num2 % tmp_num1;
							output_list.push(cur_val);
							//document.getElementById("mainDisplay").innerHTML = (cur_val.toString(base)).toUpperCase();
							//document.getElementById("mainDisplay").setAttribute("value", cur_val);
							//document.getElementById("mainDisplay").value = cur_val;
						}
					}
				}
				else if(pre_memory=="none") {
					output_list.push(0);
				}
				pre_memory = val;
			}
			else if(val == "mul" || val == "div") {
				last_operator = val;
				if(pre_memory=="num") {
					output_list.push(cur_val);
					if(output_list.length>1 && (op_stack[op_stack.length-1]=="mul"||op_stack[op_stack.length-1]=="div")||op_stack[op_stack.length-1]=="mod") {
						var tmp_num1 = parseInt(output_list.pop());
						var tmp_num2 = parseInt(output_list.pop());
						var tmp_op = op_stack.pop();
						if(tmp_op=="add") cur_val = tmp_num1 + tmp_num2;
						else if(tmp_op=="sub") cur_val = tmp_num2 - tmp_num1;
						else if(tmp_op=="mul") cur_val = tmp_num1 * tmp_num2;
						else if(tmp_op=="div") cur_val = Math.floor(tmp_num2 / tmp_num1);
						else if(tmp_op=="mod") cur_val = tmp_num2 % tmp_num1;
						output_list.push(cur_val);
						//document.getElementById("mainDisplay").innerHTML = (cur_val.toString(base)).toUpperCase();
						//document.getElementById("mainDisplay").setAttribute("value", cur_val);
						//document.getElementById("mainDisplay").value = cur_val;
					}
				}
				else if(pre_memory=="none") {
					output_list.push(0);
				}
				pre_memory = val;			
			}
			else if(val == "equ") {
				output_list.push(cur_val);
				if(op_stack.length) {
					last_operand = cur_val;
					while(op_stack.length) {
						var tmp_num1 = parseInt(output_list.pop());
						var tmp_num2 = parseInt(output_list.pop());
						var tmp_op = op_stack.pop();
						if(tmp_op=="add") cur_val = tmp_num1 + tmp_num2;
						else if(tmp_op=="sub") cur_val = tmp_num2 - tmp_num1;
						else if(tmp_op=="mul") cur_val = tmp_num1 * tmp_num2;
						else if(tmp_op=="div") cur_val = Math.floor(tmp_num2 / tmp_num1);
						else if(tmp_op=="mod") cur_val = tmp_num2 % tmp_num1;
						last_operand = tmp_num1;
						last_operator = tmp_op;
						console.log("last"+last_operand+last_operator);
						output_list.push(cur_val);
						//document.getElementById("mainDisplay").innerHTML = (cur_val.toString(base)).toUpperCase();
						//document.getElementById("mainDisplay").setAttribute("value", cur_val);
						//document.getElementById("mainDisplay").value = cur_val;
					}
				}
				else {
					if(last_operator=="add") cur_val = parseInt(cur_val) + parseInt(last_operand);
					else if(last_operator=="sub") cur_val -= last_operand;
					else if(last_operator=="mul") cur_val *= last_operand;
					else if(last_operator=="div") cur_val = Math.floor(cur_val / last_operand);
					//document.getElementById("mainDisplay").innerHTML = (cur_val.toString(base)).toUpperCase();
					//document.getElementById("mainDisplay").setAttribute("value", cur_val);
					//document.getElementById("mainDisplay").value = cur_val;
					output_list = []
					output_list.push(cur_val);
				}
				pre_memory = "equ";
				op_stack = [];
			}
			else if(val == "mod") {
				if(pre_memory == "num") {
					output_list.push(cur_val);
				}
				else if(pre_memory == "none") {
					output_list.push(0);
				}
				pre_memory = val;
			}
			else if(val == "neg") {
				if(pre_memory == "num") {
					//document.getElementById("mainDisplay").innerHTML = ((-cur_val).toString(base)).toUpperCase();
					//document.getElementById("mainDisplay").setAttribute("value", -cur_val);
					//document.getElementById("mainDisplay").value = -cur_val;
					cur_val = -cur_val;
				}
			}
			else if(val == "backspace" && pre_memory=="num") {
				if(cur_val) {
					if(cur_val>0) {
						//document.getElementById("mainDisplay").innerHTML = (( Math.floor(parseInt(cur_val, base)/10) ).toString(base)).toUpperCase();
						//document.getElementById("mainDisplay").setAttribute("value", Math.floor(parseInt(cur_val, base)/10));
						//document.getElementById("mainDisplay").value = Math.floor(parseInt(cur_val, base)/10);
						cur_val = Math.floor(parseInt(cur_val, base)/10);
					}
					else {
						cur_val = -cur_val;
						//document.getElementById("mainDisplay").setAttribute("value", -Math.floor(parseInt(cur_val, base)/10));
						//document.getElementById("mainDisplay").value = -Math.floor(parseInt(cur_val, base)/10);
						cur_val = -Math.floor(parseInt(cur_val, base)/10);
					}
				}
			}
			else if(val == "clear_cur") {
				//document.getElementById("mainDisplay").innerHTML = 0;
				//document.getElementById("mainDisplay").setAttribute("value", 0);
				//document.getElementById("mainDisplay").value = 0;
				cur_val = 0;
			}
			else if(val == "clear_all") {
				output_list = [];
				op_stack = [];
				last_operand = NaN;
				last_operator = "";
				pre_memory = "none";
				//document.getElementById("mainDisplay").innerHTML = 0;
				//document.getElementById("mainDisplay").setAttribute("value", 0);
				//document.getElementById("mainDisplay").value = 0;
				cur_val = 0;
			}
		}
		//cur_val = document.getElementById("mainDisplay").getAttribute("value");
		console.log("cur_val="+cur_val);
		display(mode);
		
	}
	
	function isNumeric(n) {
		return !isNaN(parseInt(n)) && isFinite(n);
	}
	dec_to_bho  = function(n, base) {  
		if (n < 0) {  
			n = 0xFFFFFFFF + n + 1;  
		}   
		switch (base) {    
			case 2:    
				return parseInt(n, 10).toString(2);  
				break;
			case 16:    
				return parseInt(n, 10).toString(16).toUpperCase();  
				break;
			case 8:    
				return parseInt(n, 10).toString(8);  
				break;
			default:
		}    
	}
	function display(mode) {
		//cur_val = document.getElementById("mainDisplay").getAttribute("value");
		document.getElementById("hexDisplay").innerHTML = dec_to_bho(cur_val, 16);
		document.getElementById("decDisplay").innerHTML = cur_val.toString(10);
		document.getElementById("octDisplay").innerHTML = dec_to_bho(cur_val, 8);
		document.getElementById("binDisplay").innerHTML = dec_to_bho(cur_val, 2);
		if(mode=="HEX")
			document.getElementById("mainDisplay").innerHTML = document.getElementById("hexDisplay").innerHTML;
		else if(mode=="DEC")
			document.getElementById("mainDisplay").innerHTML = document.getElementById("decDisplay").innerHTML;
		else if(mode=="OCT")
			document.getElementById("mainDisplay").innerHTML = document.getElementById("octDisplay").innerHTML;
		else if(mode=="BIN")	
			document.getElementById("mainDisplay").innerHTML = document.getElementById("binDisplay").innerHTML;
		
	}
});
