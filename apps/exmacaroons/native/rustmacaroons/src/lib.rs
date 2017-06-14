#[macro_use] extern crate rustler;
#[macro_use] extern crate lazy_static;
extern crate macaroons;

use rustler::{NifEnv, NifTerm, NifResult, NifEncoder};

mod atoms {
    rustler_atoms! {
        atom ok;
    }
}

fn add<'a>(env: NifEnv<'a>, args: &[NifTerm<'a>]) -> NifResult<NifTerm<'a>> {
    let num1: i64 = try!(args[0].decode());
    let num2: i64 = try!(args[1].decode());

    Ok((atoms::ok(), num1 + num2).encode(env))
}

rustler_export_nifs! {
    "Elixir.RustMacaroons",
    [
      ("add", 2, add),
      ("createtoken", 3, createtoken)
    ],
    None
}

use macaroons::caveat::Caveat;
use macaroons::token::Token;
use macaroons::v1::V1Token;
use macaroons::verifier::{Func, LinkVerifier};

const EMPTY_TAG: [u8; 32] = [0xe3, 0xd9, 0xe0, 0x29, 0x08, 0x52, 0x6c, 0x4c, 0x00, 0x39, 0xae,
                             0x15, 0x11, 0x41, 0x15, 0xd9, 0x7f, 0xdd, 0x68, 0xbf, 0x2b, 0xa3,
                             0x79, 0xb3, 0x42, 0xaa, 0xf0, 0xf6, 0x17, 0xd0, 0x55, 0x2f];

const EXPECTED_TAG_WITH_FIRST_PARTY_CAVEATS: [u8; 32] = [0x19, 0x7b, 0xac, 0x7a, 0x04, 0x4a, 0xf3,
                                                         0x33, 0x32, 0x86, 0x5b, 0x92, 0x66, 0xe2,
                                                         0x6d, 0x49, 0x3b, 0xdd, 0x66, 0x8a, 0x66,
                                                         0x0e, 0x44, 0xd8, 0x8c, 0xe1, 0xa9, 0x98,
                                                         0xc2, 0x3d, 0xbd, 0x67];

fn example_key() -> Vec<u8> {
    Vec::from("this is our super secret key; only we should know it")
}

fn invalid_key() -> Vec<u8> {
    Vec::from("this is not the key you are looking for; it is evil")
}

fn example_id() -> Vec<u8> {
    Vec::from("we used our secret key")
}

fn example_uri() -> Vec<u8> {
    Vec::from("http://mybank/")
}

fn example_first_party_caveat() -> Caveat {
    Caveat::first_party(Vec::from("test = caveat"))
}

fn example_first_party_caveat_different_prefix() -> Caveat {
    Caveat::first_party(Vec::from("other = test"))
}

fn verify_caveat(predicate: &str) -> bool {
    let (prefix, value) = predicate.split_at(7);
    
    if prefix != "test = " {
        return true;
    }

    value == "caveat"
}

fn verify_wrong_value(predicate: &str) -> bool {
    let (prefix, value) = predicate.split_at(7);
    
    if prefix != "test = " {
        return true;
    }

    value == "wrong"
}

fn verify_other(predicate: &str) -> bool {
    let (prefix, value) = predicate.split_at(7);
    
    if prefix != "other = " {
        return true;
    }

    value == "caveat"
}

fn example_caveat_key() -> Vec<u8> {
    Vec::from("4; guaranteed random by a fair toss of the dice")
}

fn example_third_party_caveat_id() -> Vec<u8> {
    Vec::from("this was how we remind auth of key/pred")
}

fn example_third_party_caveat_location() -> Vec<u8> {
    Vec::from("http://auth.mybank/")
}

fn example_third_party_caveat() -> Caveat {
    Caveat::third_party(example_caveat_key(),
                        example_third_party_caveat_id(),
                        example_third_party_caveat_location())
}

fn example_token() -> V1Token {
    V1Token::new(&example_key(), example_id(), Some(example_uri()))
}

fn example_serialized_with_first_party_caveats() -> Vec<u8> {
    Vec::from("MDAxY2xvY2F0aW9uIGh0dHA6Ly9teWJhbmsvCjAwMjZpZGVudGlmaWVyIHdlIHVzZWQgb3VyIHNlY3JldCB\
               rZXkKMDAxNmNpZCB0ZXN0ID0gY2F2ZWF0CjAwMmZzaWduYXR1cmUgGXusegRK8zMyhluSZuJtSTvdZopmDk\
               TYjOGpmMI9vWcK")
}

fn createtoken<'a>(env: NifEnv<'a>, args: &[NifTerm<'a>]) -> NifResult<NifTerm<'a>> {
     let key: Vec<u8> = args[0].decode()?;
     let identifier: Vec<u8> = try!(args[1].decode());
     let location: Vec<u8> = args[2].decode()?;

     let mut bytes: Vec<u8> = args[0].decode()?;
     let s = String::from_utf8_lossy(&bytes).to_string();

     let token = V1Token::new(&key, identifier, Some(location));
     let serializedtoken = token.serialize().unwrap();
     Ok((atoms::ok(), serializedtoken).encode(env)) 
}

