cmd_Release/secp256k1.node := ln -f "Release/obj.target/secp256k1.node" "Release/secp256k1.node" 2>/dev/null || (rm -rf "Release/secp256k1.node" && cp -af "Release/obj.target/secp256k1.node" "Release/secp256k1.node")