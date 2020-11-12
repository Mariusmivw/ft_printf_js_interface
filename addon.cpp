#include <napi.h>
#include <stdio.h>
#include <iostream>
extern "C" {
	#include "ft_printf.h"
}
using namespace std;

// template <typename Type>
int		Fn(const Napi::CallbackInfo &args, int(*cb)(const char *, ...))
{
	size_t len = args.Length();
	size_t size = 0;
	for (size_t i=1; i<len; i++)
	{
		string value_type = args[i].As<Napi::Array>().Get((uint32_t)0).As<Napi::String>().Utf8Value();
		if (value_type == "char *")
			size += sizeof(char *);
		if (value_type == "char")
			size += sizeof(char);
		if (value_type == "NULL")
			size += sizeof(NULL);
		if (value_type == "double")
			size += sizeof(double);
		if (value_type == "long long")
			size += sizeof(int64_t);
		if (value_type == "unsigned long long")
			size += sizeof(uint32_t);
	}
	char *m = (char *)malloc(size);
	void *bm = m;
	for (size_t i=1; i<len; i++)
	{
		string value_type = args[i].As<Napi::Array>().Get((uint32_t)0).As<Napi::String>().Utf8Value();
		Napi::Value value = args[i].As<Napi::Array>().Get((uint32_t)1);
		if (value_type == "char *")
		{
			*(char **)m = (char *)value.ToString().Utf8Value().c_str();
			m += sizeof(char*);
		}
		if (value_type == "char")
		{
			(*(char*)m) = value.ToString().Utf8Value()[0];
			m += sizeof(char);
		}
		if (value_type == "NULL")
		{
			(*(char**)m) = NULL;
			m += sizeof(char*);
		}
		if (value_type == "double")
		{
			(*(double*)m) = value.ToNumber().DoubleValue();
			m += sizeof(double);
		}
		if (value_type == "long long")
		{
			(*(int64_t*)m) = value.ToNumber().Int64Value();
			m += sizeof(int64_t);
		}
		if (value_type == "unsigned long long")
		{
			(*(uint32_t*)m) = value.ToNumber().Uint32Value();
			m += sizeof(uint32_t);
		}
	}

	return (cb(
		args[0].As<Napi::Array>().Get((uint32_t)1).As<Napi::String>().Utf8Value().c_str(),
		*(void**)bm
	));
}

Napi::Number FT_PRINTF(const Napi::CallbackInfo &args)
{
	int len = Fn(args, ft_printf);
	return (Napi::Number::New(args.Env(), len));
}

Napi::Number PRINTF(const Napi::CallbackInfo &args)
{
	int len = Fn(args, printf);
	return (Napi::Number::New(args.Env(), len));
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
	exports.Set(
		Napi::String::New(env, "ft_printf"),
		Napi::Function::New(env, FT_PRINTF));
	exports.Set(
		Napi::String::New(env, "printf"),
		Napi::Function::New(env, PRINTF));

	return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)