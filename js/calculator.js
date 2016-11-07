$(document).ready(function(){
	var op_stack = [];
	var output_list = [];
	var pre_memory = "none";
	var last_operator, last_operand;
	var mode = "DEC";
	var cur_val = 0;
	$("button").each(function() {
		$(this).click(function(){
			calc($(this).attr("value"));
		});
	});
	$(".bases").each(function() {
		$(this).mouseover(function() {
			$(this).css("backgroundColor", "#DCDCDC");
		});
		$(this).mouseout(function() {
			$(this).css("backgroundColor", "#F0FFFF");
		});
		$(this).click(function() {
			mode = $(this).find("h2").html();
			if(mode == "HEX") {
				$("[value='A']").prop('disabled', false);
				$("[value='B']").prop('disabled', false);
				$("[value='C']").prop('disabled', false);
				$("[value='D']").prop('disabled', false);
				$("[value='E']").prop('disabled', false);
				$("[value='F']").prop('disabled', false);
				$("[value='9']").prop('disabled', false);
				$("[value='8']").prop('disabled', false);
				$("[value='7']").prop('disabled', false);
				$("[value='6']").prop('disabled', false);
				$("[value='5']").prop('disabled', false);
				$("[value='4']").prop('disabled', false);
				$("[value='3']").prop('disabled', false);
				$("[value='2']").prop('disabled', false);
				$("#mainDisplay").html( $("#hexDisplay").html() );
				$("#hexDisplay").css("color", "#42AAF4");
				$("#decDisplay").css("color", "#000000");
				$("#octDisplay").css("color", "#000000");
				$("#binDisplay").css("color", "#000000");
				$("#hexLabel").css("color", "#42AAF4");
				$("#decLabel").css("color", "#000000");
				$("#octLabel").css("color", "#000000");
				$("#binLabel").css("color", "#000000");
			}
			else if(mode == "DEC") {
				$("[value='A']").prop('disabled', true);
				$("[value='B']").prop('disabled', true);
				$("[value='C']").prop('disabled', true);
				$("[value='D']").prop('disabled', true);
				$("[value='E']").prop('disabled', true);
				$("[value='F']").prop('disabled', true);
				$("[value='9']").prop('disabled', false);
				$("[value='8']").prop('disabled', false);
				$("[value='7']").prop('disabled', false);
				$("[value='6']").prop('disabled', false);
				$("[value='5']").prop('disabled', false);
				$("[value='4']").prop('disabled', false);
				$("[value='3']").prop('disabled', false);
				$("[value='2']").prop('disabled', false);
				$("#mainDisplay").html( $("#decDisplay").html() );
				$("#hexDisplay").css("color", "#000000");
				$("#decDisplay").css("color", "#42AAF4");
				$("#octDisplay").css("color", "#000000");
				$("#binDisplay").css("color", "#000000");
				$("#hexLabel").css("color", "#000000");
				$("#decLabel").css("color", "#42AAF4");
				$("#octLabel").css("color", "#000000");
				$("#binLabel").css("color", "#000000");
			}
			else if(mode == "OCT") {
				$("[value='A']").prop('disabled', true);
				$("[value='B']").prop('disabled', true);
				$("[value='C']").prop('disabled', true);
				$("[value='D']").prop('disabled', true);
				$("[value='E']").prop('disabled', true);
				$("[value='F']").prop('disabled', true);
				$("[value='9']").prop('disabled', true);
				$("[value='8']").prop('disabled', true);
				$("[value='7']").prop('disabled', false);
				$("[value='6']").prop('disabled', false);
				$("[value='5']").prop('disabled', false);
				$("[value='4']").prop('disabled', false);
				$("[value='3']").prop('disabled', false);
				$("[value='2']").prop('disabled', false);
				$("#mainDisplay").html( $("#octDisplay").html() );
				$("#hexDisplay").css("color", "#000000");
				$("#decDisplay").css("color", "#000000");
				$("#octDisplay").css("color", "#42AAF4");
				$("#binDisplay").css("color", "#000000");
				$("#hexLabel").css("color", "#000000");
				$("#decLabel").css("color", "#000000");
				$("#octLabel").css("color", "#42AAF4");
				$("#binLabel").css("color", "#000000");
			}
			else if(mode == "BIN") {
				$("[value='A']").prop('disabled', true);
				$("[value='B']").prop('disabled', true);
				$("[value='C']").prop('disabled', true);
				$("[value='D']").prop('disabled', true);
				$("[value='E']").prop('disabled', true);
				$("[value='F']").prop('disabled', true);
				$("[value='9']").prop('disabled', true);
				$("[value='8']").prop('disabled', true);
				$("[value='7']").prop('disabled', true);
				$("[value='6']").prop('disabled', true);
				$("[value='5']").prop('disabled', true);
				$("[value='4']").prop('disabled', true);
				$("[value='3']").prop('disabled', true);
				$("[value='2']").prop('disabled', true);
				$("#mainDisplay").html( $("#binDisplay").html() );
				$("#hexDisplay").css("color", "#000000");
				$("#decDisplay").css("color", "#000000");
				$("#octDisplay").css("color", "#000000");
				$("#binDisplay").css("color", "#42AAF4");
				$("#hexLabel").css("color", "#000000");
				$("#decLabel").css("color", "#000000");
				$("#octLabel").css("color", "#000000");
				$("#binLabel").css("color", "#42AAF4");
			}
		});
	});

	function calc(val) {
		var base;
		if(mode=="HEX") base=16;
		else if(mode=="DEC") base=10;
		else if(mode=="OCT") base=8;
		else if(mode=="BIN") base=2;
		console.log("op "+op_stack);
		console.log("list "+output_list);
		if( isNumeric(val) || (val>="A" && val<="F")) {	//numbers
			if(base==16) val = "0x" + val;
			if(pre_memory == "add" || pre_memory == "sub" || pre_memory == "mul" || pre_memory == "div" || pre_memory == "mod") {
				cur_val = parseInt(val, base);
				op_stack.push(pre_memory);
			}
			else if(pre_memory == "equ") {
				cur_val = parseInt(val, base);
			}
			else if(pre_memory == "num" || pre_memory == "none") {
				cur_val = cur_val*base + parseInt(val, base);
			}
			pre_memory = "num";
		}
		else {
			if(val == "add" || val == "sub") {
				last_operator = val;
				if(pre_memory=="num") {
					console.log(cur_val);
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
					}
				}
				else {
					if(last_operator=="add") cur_val = parseInt(cur_val) + parseInt(last_operand);
					else if(last_operator=="sub") cur_val -= last_operand;
					else if(last_operator=="mul") cur_val *= last_operand;
					else if(last_operator=="div") cur_val = Math.floor(cur_val / last_operand);
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
					cur_val = -cur_val;
				}
			}
			else if(val == "backspace" && pre_memory=="num") {
				if(cur_val) {
					console.log("back"+cur_val+" "+base);
					if(cur_val>0) {
						cur_val = Math.floor(cur_val/base);
					}
					else {
						cur_val = -cur_val;
						cur_val = -Math.floor(cur_val/base);
					}
				}
			}
			else if(val == "clear_cur") {
				cur_val = 0;
			}
			else if(val == "clear_all") {
				output_list = [];
				op_stack = [];
				last_operand = NaN;
				last_operator = "";
				pre_memory = "none";
				cur_val = 0;
			}
		}
		console.log("cur_val="+cur_val);
		display(mode);
		
	}
	
	function isNumeric(n) {
		return !isNaN(parseInt(n)) && isFinite(n);
	}
	dec_to_bho  = function(n, base) {
		console.log(n);
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
		$("#hexDisplay").html(dec_to_bho(cur_val, 16));
		$("#decDisplay").html(cur_val.toString(10));
		$("#octDisplay").html(dec_to_bho(cur_val, 8));
		$("#binDisplay").html(dec_to_bho(cur_val, 2));
		if(mode=="HEX")
			$("#mainDisplay").html(dec_to_bho(cur_val, 16));
		else if(mode=="DEC")
			$("#mainDisplay").html(cur_val.toString(10));
		else if(mode=="OCT")
			$("#mainDisplay").html(dec_to_bho(cur_val, 8));
		else if(mode=="BIN")	
			$("#mainDisplay").html(dec_to_bho(cur_val, 2));
	}
});
