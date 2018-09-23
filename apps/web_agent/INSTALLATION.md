    nano ../../deps/wallaby/lib/wallaby/phantom/driver.ex 

Have to override the user_agent with 

    capabilities = Phantom.capabilities(
      user_agent: opts[:user_agent],
      custom_headers: opts[:custom_headers]
    )
