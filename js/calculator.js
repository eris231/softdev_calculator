window.onload = function() {
	var op_stack = [];
	var output_list = [];
	var pre_memory = "none";
	var last_operator, last_operand;
	var buttons = document.querySelectorAll("button");
	var bases = document.querySelectorAll(".bases");
	var mode = "DEC";
	for(var i=0;i<buttons.length;i++) {
		buttons[i].addEventListener("click", function() {
			display(this.getAttribute("value"));
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
		});
	}
	console.log(buttons);
	function display(val) {
		console.log("op "+op_stack);
		console.log("list "+output_list);
		var cur_val = document.getElementById("mainDisplay").innerHTML;
		cur_val = parseInt(cur_val);
		
		if( isNumeric(val) ) {	//0~9
			if(pre_memory == "add" || pre_memory == "sub" || pre_memory == "mul" || pre_memory == "div")
				op_stack.push(pre_memory);
			
			if(pre_memory == "add" || pre_memory == "sub" || pre_memory == "mul" || pre_memory == "div" || pre_memory == "none" || pre_memory == "equ") {
				document.getElementById("mainDisplay").innerHTML = parseInt(val);
			}
			else if(pre_memory == "num") {
				if(parseInt(cur_val) != 0)
					document.getElementById("mainDisplay").innerHTML = cur_val*10 + parseInt(val);
				else
					document.getElementById("mainDisplay").innerHTML = parseInt(val);
			}
			pre_memory = "num";
		}
		else {
			if(val == "add" || val == "sub") {
				last_operator = val;
				if(pre_memory=="num") {
					cur_val = document.getElementById("mainDisplay").innerHTML;
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
							output_list.push(cur_val);
							document.getElementById("mainDisplay").innerHTML = cur_val;
						}
					}
				}
				pre_memory = val;
			}
			else if(val == "mul" || val == "div") {
				last_operator = val;
				console.log("oplen" + op_stack.length);
				if(pre_memory=="num") {
					cur_val = document.getElementById("mainDisplay").innerHTML;
					output_list.push(cur_val);
					if(output_list.length>1 && (op_stack[op_stack.length-1]=="mul"||op_stack[op_stack.length-1]=="div")) {
						var tmp_num1 = parseInt(output_list.pop());
						var tmp_num2 = parseInt(output_list.pop());
						var tmp_op = op_stack.pop();
						if(tmp_op=="add") cur_val = tmp_num1 + tmp_num2;
						else if(tmp_op=="sub") cur_val = tmp_num2 - tmp_num1;
						else if(tmp_op=="mul") cur_val = tmp_num1 * tmp_num2;
						else if(tmp_op=="div") cur_val = Math.floor(tmp_num2 / tmp_num1);
						output_list.push(cur_val);
						document.getElementById("mainDisplay").innerHTML = cur_val;
					}
					
				}
				pre_memory = val;			
			}
			else if(val == "equ") {
				cur_val = document.getElementById("mainDisplay").innerHTML;
				output_list.push(cur_val);
				if(op_stack.length) {
					last_operand = parseInt(cur_val);
					while(op_stack.length) {
						var tmp_num1 = parseInt(output_list.pop());
						var tmp_num2 = parseInt(output_list.pop());
						var tmp_op = op_stack.pop();
						if(tmp_op=="add") cur_val = tmp_num1 + tmp_num2;
						else if(tmp_op=="sub") cur_val = tmp_num2 - tmp_num1;
						else if(tmp_op=="mul") cur_val = tmp_num1 * tmp_num2;
						else if(tmp_op=="div") cur_val = Math.floor(tmp_num2 / tmp_num1);
						output_list.push(cur_val);
						document.getElementById("mainDisplay").innerHTML = cur_val;
					}
				}
				else {
					if(last_operator=="add") cur_val = parseInt(cur_val) + parseInt(last_operand);
					else if(last_operator=="sub") cur_val -= last_operand;
					else if(last_operator=="mul") cur_val *= last_operand;
					else if(last_operator=="div") cur_val = Math.floor(cur_val / last_operand);
					document.getElementById("mainDisplay").innerHTML = cur_val;
					output_list = []
					output_list.push(cur_val);
				}
				pre_memory = "equ";
				op_stack = [];
			}
			else if(val == "backspace") {
				if(parseInt(cur_val)) {
					if(parseInt(cur_val)>0)
						document.getElementById("mainDisplay").innerHTML = Math.floor(parseInt(cur_val)/10);
					else {
						cur_val = -(parseInt(cur_val));
						document.getElementById("mainDisplay").innerHTML = -Math.floor(cur_val/10);
					}
				}
			}
			else if(val == "clear_cur") {
				document.getElementById("mainDisplay").innerHTML = 0;
			}
			else if(val == "clear_all") {
				output_list = [];
				op_stack = [];
				last_operand = NaN;
				last_operator = "";
				pre_memory = "none";
				document.getElementById("mainDisplay").innerHTML = 0;
			}
		}
		console.log(val.toString(8));
		cur_val = document.getElementById("mainDisplay").innerHTML;
		cur_val = parseInt(cur_val);
		document.getElementById("hexDisplay").innerHTML = String.toUpperCase(cur_val.toString(16));
		document.getElementById("decDisplay").innerHTML = cur_val.toString(10);
		document.getElementById("octDisplay").innerHTML = cur_val.toString(8);
		document.getElementById("binDisplay").innerHTML = cur_val.toString(2);
	}
	
	function isNumeric(n) {
		return !isNaN(parseInt(n)) && isFinite(n);
	}
}
